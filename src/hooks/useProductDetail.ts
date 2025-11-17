import { getProductById, GetProductByIdParams } from "@/api/getProductById";
import { QueryConfig } from "@/lib/reactQuery";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProductDetailQueryKey = (params: GetProductByIdParams) => ["product-list", params.id];

export const getProductDetailQueryOptions = (params: GetProductByIdParams) => {
    return queryOptions({
        queryKey: getProductDetailQueryKey(params),
        queryFn: () => getProductById(params),
    });
};

type UseProductDetailParams = {
    id: string;
    queryConfig?: QueryConfig<typeof getProductDetailQueryOptions>
}

export const useProductDetail = (params: UseProductDetailParams) => {
    return useQuery({
        ...getProductDetailQueryOptions({ id: params.id }),
        ...params.queryConfig,
    });
};