declare namespace Express {

    export interface Request {
        identification: {
            userToken: string;
        }

        metadata: {
            userID: number;
        }
    }

}