
import { NextComponentType } from "next";
import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface T{
	indicators: boolean,
	scale: number,
	duration: number,
	transitionDuration: number,
	infinite: boolean,
	prevArrow: JSX.Element,
	nextArrow: JSX.Element
}

const Slideshow: NextComponentType = (): JSX.Element => {
	//Array of Images
	const images = [
		"https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_6.jpg?alt=media&token=baec4b1c-75f1-4227-ba57-914e06302787",
    "https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_4.jpg?alt=media&token=4c9c97f6-fba3-436d-bf1c-37d87bc9188"
    ,
		"https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/gallery%2FVincetheKid.jpg?alt=media&token=8cce2d79-05c5-439a-b9df-6644c567a37f",
	];

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties: T = {
		indicators: true,
		scale: 1.2,
		duration: 5000,
		transitionDuration: 500,
		infinite: true,
		prevArrow: (
			<div style={{ width: "30px", marginRight: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
				</svg>
			</div>
		),
		nextArrow: (
			<div style={{ width: "30px", marginLeft: "-30px", cursor: "pointer" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="#2e2e2e"
				>
					<path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
				</svg>
			</div>
		),
	};
	return (
		<div className="m-10">
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
          <div key={index} className="flex justify-center w-full h-full md:h-3/4">
						<img
							className="w-3/4 object-cover rounded-lg shadow-xl"
							src={each}
						/>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;
