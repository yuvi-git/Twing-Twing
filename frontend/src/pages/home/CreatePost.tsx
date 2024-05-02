import React, { useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

function CreatePost() {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<null | string>(null);

  const imgRef = useRef<HTMLInputElement>(null);

  const isPending: boolean = false;
  const isError: boolean = false;

  const data : {profileImg: string} = {
    profileImg: "/avatars/boy1.png"
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    alert("Post created successfully")
    setText("");
    setImg(null);
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file: File | undefined = e.target.files?.[0];
    if(file){
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='flex p-4 items-start gap-4 border-b border-gray-700'>
      <div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={data.profileImg || "/avatar-placeholder.png"} />
				</div>
			</div>

      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				{img && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImg(null);
								{imgRef.current? imgRef.current.value = "": null}
							}}
						/>
            
						<img src={img} className='w-full mx-auto h-72 object-contain rounded' />
            
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={() => imgRef.current?.click()}
						/>
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>
					<input type='file' 
          accept="image/*"
          hidden ref={imgRef} onChange={handleImgChange} />
					<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
						{isPending ? "Posting..." : "Post"}
					</button>
				</div>
				{isError && <div className='text-red-500'>Something went wrong</div>}
			</form>
    </div>
  )
}

export default CreatePost