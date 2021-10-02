import { resolve, join } from 'path';

export function getEnvironmentFilePath(filePrefix: string): string {
  return resolve(join(`.${filePrefix}.env`));
}

export function parseAccordingToPrefixType(configName: string): string {
  const extractName = configName.split('.')[1];

  return extractName;
}
