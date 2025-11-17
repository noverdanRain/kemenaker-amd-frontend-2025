import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/getAllProducts";

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