const posting =
    (uri, post, setPendding, setData, setError, headerType) => {

        const abort = new AbortController();
        const signal = abort.signal;


        setPendding(true)
        fetch(uri, {
                signal,
                method: 'Post',
                body: post,
            })
            .then(res => {
                if (!res.ok) throw Error('err')
                else return res.json()
            })
            .then(res => {
                setData(res)
                setPendding(null)
                setError(null)
            })
            .catch(err => {
                setPendding(null)
                setData(null)
                setError(true)
            })

        return () => abort.abort()




    }


export default posting;