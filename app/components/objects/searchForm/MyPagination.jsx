'use client'
import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


function MyPagination({ count }) {
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

    const page_link = buildLink();
    return (<>
        <div
            className="my-10 p-5 flex flex-row-reverse "
            style={{

                alignContent: "flex-end",
                alignItems: "flex-end"

            }}

        >
            <Pagination
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        replace

                        href={item.page === params.get('page') ? null : '/objects?page=' + item.page + "&" + page_link}
                        // to={`/objects?${`?page=${item.page}`}`}
                        {...item}
                    />
                )}

                count={Math.ceil(count / 20)} />
        </div>
    </>);
}

export default MyPagination;