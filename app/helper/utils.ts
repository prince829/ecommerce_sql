import { promisify } from 'util';
import { stat, readdir } from 'fs';
import { join } from 'path';
import _ from "underscore";

const Utils = {
    isDirectory: async (f: string): Promise<boolean> => {
        return (await promisify(stat)(f)).isDirectory();
    },
    _readdir: async (filePath: string): Promise<string[]> => {
        const files = await Promise.all((await promisify(readdir)(filePath)).map(async f => {
            const fullPath = join(filePath, f);
            return (await Utils.isDirectory(fullPath)) ? Utils._readdir(fullPath) : fullPath;
        }));

        return _.flatten(files);
    },
    numFormatter: (numbers:any) => {
		// Thousand(K), Million(M), Billion(B), Trillion(T), Peta(P), Exa(E)
		const num = Number(numbers);
		const si:any = [
		  { value: 1, symbol: '' }, // if value < 1000, nothing to do
		  { value: 1E3, symbol: 'k' }, // convert to K for number from > 1000 < 1 million 
		  { value: 1E6, symbol: 'm' }, // convert to M for number from > 1 million 
		  { value: 1E9, symbol: 'B' }, // convert to B for number greater than 1 Billion
		  { value: 1E12, symbol: 'T' }, // convert to T for number greater than 1 Trillion
		//   { value: 1E15, symbol: 'P' }, // convert to P for number greater than 1 Peta
		//   { value: 1E18, symbol: 'E' } // convert to E for number greater than 1 Exa
		];
		const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
		let i;
		for (i = si.length - 1; i > 0; i--) {
            
		  if (num >= si[i].value) {
			break;
		  }
		}
		return (num / si[i].value).toFixed(2).replace(rx, '$1') + ' ' + si[i].symbol;
	},
};

export default Utils;