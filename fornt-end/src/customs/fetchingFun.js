const fetchingFun =
    (uri, setPendding, setData, setError) => {

        const abort = new AbortController();
        const signal = abort.signal;


        setPendding(true)
        fetch(uri, {
                signal,

            })
            .then(res => {
                if (!res.ok) throw Error('err')
                else return res.json()
            })
            .then(res => {
                setData(res)
                setPendding(false)
                setError(false)
            })
            .catch(err => {
                setData(null)
                setPendding(null)
                setError(true)
            })

        return () => abort.abort()




    }


export default fetchingFun;