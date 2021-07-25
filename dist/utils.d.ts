/// <reference types="node" />
declare const _default: {
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    documentSavePath: (filePath: string, outputFileName: string) => any;
    getFileName: (filePath: string) => string;
    getFileExtension: (filePath: string) => ".xlsx" | ".json";
    isJSON: (sourceFileType: string) => boolean;
    isXLSX: (sourceFileType: string) => boolean;
    getSourceFileType: (filePath: string) => string;
    stopProcessWithAMessage: (message: string, process: NodeJS.Process) => never;
    createProcessMessageByType: (filePath: string, sourceFileType: string) => void;
    addKeyConnectors: (arr: string[]) => string;
    writeByCheckingParent: (parentKey: string | null, key: string) => string;
    createPathByCheckingSpaceCharacter: (path: string | string[]) => string;
};
export default _default;
