import Head from 'next/head'
import { useState } from 'react'
import NoData from '@/components/UI/NoData'
import { fetchAPI } from 'utils/utils'
import Products from '@/components/Products/Products'
import Pagination from '@/components/Dashboard/Pagination'

export default function Home({data}) {

    const [dataSliced] = useState(10)
    const [page, setPage] = useState(1)
    
    if(data) {
        return (
            <>
                <Head>
                    <title>Store | TheSneakers</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <section className='mt-10 mb-5'>
                    {data.length > 0 ? (
                        <Products data={data} dataSliced={dataSliced} page={page}/>
                    ) : (
                        <NoData title='Oops Sorry, Our Products Still Empty :('/>
                    )}
                </section>
                <section className="mt-10">
                    {data.length > dataSliced && (
                        <Pagination 
                            home 
                            page={1} 
                            page={page} 
                            setPage={setPage}
                            dataLength={(dataSliced * page) >= (data.length)}/>
                    )}
                </section>
            </>
        )

    }

}



export const getStaticProps = async() => {
    const data = await fetchAPI('products')
    const sortingDataByDate = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return {
        props: { data: sortingDataByDate },
        revalidate: 60
    }
}
