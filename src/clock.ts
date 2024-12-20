import gitlog from 'gitlog';
import fs from 'fs';

import { getElapsedTimeString } from './utils';

const commits = (
  await gitlog({
    repo: './',
    number: 999999,
    fields: ['hash', 'subject', 'committerDate', 'authorName'],
    file: 'sketch',
  })
)
  .map((c) => ({ ...c, date: new Date(c.committerDate) }))
  .sort((a, b) => a.date.getTime() - b.date.getTime());

const elapsedTotals = {
  Eric: 0,
  Dora: 0,
};

const lastCommitByAuthor: Record<
  string,
  { hash?: string; message?: string }
> = {
  Eric: {},
  Dora: {},
};

for (let i = 1; i < commits.length; i++) {
  const commit = commits[i];
  const prevCommit = commits[i - 1];
  const elapsed = commit.date.getTime() - prevCommit.date.getTime();
  const author = commit.authorName.startsWith('Eric') ? 'Eric' : 'Dora';
  elapsedTotals[author] += elapsed;
  lastCommitByAuthor[author] = {
    hash: commit.hash,
    message: commit.subject,
  };
}

const lastCommit = commits[commits.length - 1];
const turn = lastCommit.authorName.startsWith('Eric') ? 'Dora' : 'Eric';

const data = {
  lastCommit: lastCommit.date,
  turn,
  authors: {
    Eric: {
      time: elapsedTotals.Eric,
      commit: lastCommitByAuthor.Eric,
    },
    Dora: {
      time: elapsedTotals.Dora,
      commit: lastCommitByAuthor.Dora,
    },
  }
};

fs.writeFileSync('src/stats.json', JSON.stringify(data, null, 2));


const elapsed = new Date().getTime() - lastCommit.date.getTime();
elapsedTotals[turn] += elapsed;

console.log(`It's ${turn}'s turn!

Eric: ${getElapsedTimeString(elapsedTotals.Eric)}
${lastCommitByAuthor.Eric?.hash} - ${lastCommitByAuthor.Eric?.message}

Dora: ${getElapsedTimeString(elapsedTotals.Dora)}
${lastCommitByAuthor.Dora?.hash} - ${lastCommitByAuthor.Dora?.message}
`);
