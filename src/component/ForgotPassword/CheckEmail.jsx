import Image from "next/image";
import tab from "../../assets/tab-1 1.png";


const CheckEmail = () => {
    return (
        <>
            <div className="border p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-h-[287px] overflow-hidden max-w-md mx-auto mt-80 text-center">
            <Image
                src={tab}
                alt="confirm icon"
                width={86}
                height={86}
                className="rounded-t-lg mb-4 mx-auto"
            />
            <h2 className="text-lg font-bold">Check your email</h2>
            <p className="text-xs font-normal text-gray-500">
                A link to reset your password has been sent to <br/>
                emmanuel@yahoo.com
            </p>
            </div>
      </>
    );
}

export default CheckEmail;