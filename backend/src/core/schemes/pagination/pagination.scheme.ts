import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class IPagination {
    /**
     * Requested page
     */
    page?: number;

    /**
     * Limit of the results per page
     */
    limit?: number;
}

/**
 * Default pagination DTO
 */
export class PaginationDTO implements IPagination {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number = 10;
}