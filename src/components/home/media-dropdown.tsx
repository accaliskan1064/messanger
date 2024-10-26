import { Dialog, DialogContent, DialogDescription } from '@radix-ui/react-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Image, ImageIcon, Plus, Video } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
 

const MediaDropDown = () => {

    const imageInput = useRef<HTMLInputElement>(null);
	const videoInput = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
			<input
				type='file'
				ref={imageInput}
				accept='image/*'
				onChange={(e) => setSelectedImage(e.target.files![0])}
				hidden
                />

<input
				type='file'
				ref={videoInput}
				accept='video/mp4'
				onChange={(e) => setSelectedVideo(e.target?.files![0])}
				hidden
			/>

<DropdownMenu>
				<DropdownMenuTrigger>
					<Plus className='text-gray-600 dark:text-gray-400' />
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => imageInput.current!.click()}>
						<ImageIcon size={18} className='mr-1' /> Photo
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => videoInput.current!.click()}>
						<Video size={20} className='mr-1' />
						Video
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
                </>
  )
}

export default MediaDropDown

type MediaImageDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedImage: File;
	isLoading: boolean;
};

const MediaImageDialog = ({ isOpen, onClose, selectedImage, isLoading}: MediaImageDialogProps) => {
	const [renderedImage, setRenderedImage] = useState<string | null>(null)

	useEffect(() => {
		if (!selectedImage) return;
		const reader = new FileReader();
		reader.onload = (e) => setRenderedImage(e.target?.result as string);
		reader.readAsDataURL(selectedImage);
	}, [selectedImage]);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(isOpen) => {
				if (!isOpen) onClose();
			}}
		>
			<DialogContent>
				<DialogDescription className='flex flex-col gap-10 justify-center items-center'>
					{renderedImage && <Image src={renderedImage} width={300} height={300} alt='selected image' />}
					<Button className='w-full' disabled={isLoading}>
						{isLoading ? "Sending..." : "Send"}
					</Button>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};