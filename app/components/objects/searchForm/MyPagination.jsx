'use client'
import { serialize } from "@/app/heplers/clientHelpers";
import { useObjectSearchFormState } from "@/app/objects/store";
import { Pagination, PaginationItem } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


function MyPagination({ count, page, handlePage }) {

    const setState = useObjectSearchFormState((state) => state.setState)
    const search = useObjectSearchFormState((state) => state.activeSearch)
    const search_updated = useObjectSearchFormState((state) => state.search_updated)
    const [page_link, setPage_link] = useState('');

    useEffect(() => {
        console.log(page)

    }, [page])

    useEffect(() => {
        setPage_link(buildLink());
    }, [])

    useEffect(() => {
        if (search_updated > 0) {
            setPage_link(serialize(search))
        }
    }, [search])

    const params = useSearchParams();
    // console.log(params.toString());
    const buildLink = () => {
        const result_array = [];
        params.forEach((value, key) => {
            if (key !== 'page') {
                result_array.push(key + '=' + value)
            }

        });
        return result_array.join('&')
    }



    return (<>
        <div
            className="my-10 p-5 flex flex-row-reverse "
            style={{

                alignContent: "flex-end",
                alignItems: "flex-end"

            }}

        >
            <Pagination
                onChange={handlePage}
                page={page}
                renderItem={(item) => (
                    <PaginationItem
                        // component={Link}
                        // replace
                        // page={page}

                        // onCha={handlePage}

                        // href={item.page === params.get('page') ? null : '/objects?page=' + item.page + "&" + page_link}
                        // to={`/objects?${`?page=${item.page}`}`}
                        {...item}
                    />
                )}

                count={Math.ceil(count / 20)} />
        </div>
    </>);
}

export default dynamic(() => Promise.resolve(MyPagination), { ssr: false })
// export default ;