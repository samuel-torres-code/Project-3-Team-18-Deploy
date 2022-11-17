import { useEffect, useState } from 'react'


const useImage = (fileName) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../images/${fileName}`) // change relative path to suit your needs
                setImage(response.default)
            } catch (err) {
                
                const response = await import(`../images/image_not_found.png`) // change relative path to suit your needs
                setImage(response.default)

                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}

export default useImage;