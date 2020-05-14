import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
const resolversMap: IResolvers = {
    ...query,
    ...mutation
};
export default resolversMap;