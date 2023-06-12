import { type CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:3000/graphql',
    documents: ['src/**/*.tsx', 'src/**/*.ts', 'app/**/*.tsx', 'app/**/*.ts'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/gql/': {
            preset: 'client'
        }
    }
}

export default config
