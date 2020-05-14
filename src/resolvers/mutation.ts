import { IResolvers } from 'graphql-tools';
import { processUpload } from '../lib/upload';


const mutation: IResolvers = {
    Mutation: {
        addPhoto: (_, { file }, { cloudinary }) => processUpload(file, cloudinary),
    }
};

export default mutation;