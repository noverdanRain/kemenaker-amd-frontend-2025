import { getAllProducts } from "@/api/getAllProducts";
import { QueryConfig } from "@/lib/reactQuery";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProductListQueryKey = () => ["product-list"];

export const getProductListQueryOptions = () => {
    return queryOptions({
        queryKey: getProductListQueryKey(),
        queryFn: getAllProducts,
    });
};

type UseProductListParams = {
    queryConfig?: QueryConfig<typeof getProductListQueryOptions>;
};

export const useProductList = (params: UseProductListParams = {}) => {
    return useQuery({
        ...getProductListQueryOptions(),
        ...params.queryConfig,
    });
};