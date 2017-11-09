import fs from 'fs';
import path from 'path';
import parse from './parser';
import render from './render';

export default (pathToFile1, pathToFile2, format = 'standart') => {
  const firstFileStr = fs.readFileSync(pathToFile1, 'utf-8');
  const secondFileStr = fs.readFileSync(pathToFile2, 'utf-8');
  const firstFileExtension = path.extname(pathToFile1);
  const secondFileExtension = path.extname(pathToFile2);

  const firstFile = parse(firstFileStr, firstFileExtension);
  const secondFile = parse(secondFileStr, secondFileExtension);
  if (format === 'plain') {
    return render(firstFile, secondFile).toPlain();
  }

  return render(firstFile, secondFile).toString();
};
