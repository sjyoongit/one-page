import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return(
        <div className="hd_logo">
            <Link href="/">
                <a>
                    <Image
                        src="https://res.cloudinary.com/applotnwjd/image/upload/v1654236066/one_logo_8f95cba915.png"
                        alt="로고"
                        width={180}
                        height={60}
                    />
                </a>
            </Link>
        
        </div>
    )
}

export default Logo;