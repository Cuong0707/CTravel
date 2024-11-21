import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'

export default function useQueryConfig() {
    const queryParams = useQueryParams()
    const queryConfig = omitBy(
        {
            pageNumber: queryParams.pageNumber || 0,
            pageSize: queryParams.pageSize || 8,
            sortDir: queryParams.sortDir || 'asc',
            id: queryParams?.id
        },
        isUndefined
    )
    return queryConfig
}
