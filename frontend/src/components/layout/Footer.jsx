import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#032B22] text-[#EFEDE7] py-10">
        <div className="container mx-auto flex flex-wrap justify-between items-start">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
                <h2 className="text-xl mb-4  text-center font-LakesNeueRegular">OFFICE</h2>
                <p className=" text-center font-TypewcondRegular">Shop No. 3, Chavan Chawl, Jogeshwari (W),<br />Mumbai PIN : 400102</p>
                <p className="mt-4  text-center font-TypewcondRegular">+91-9820397879<br />global108b@gmail.com</p>
            </div>
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
                <h3 className="text-xl mb-4 font-LakesNeueRegular text-center">OFFICE HOURS</h3>
                <p className="text-center font-TypewcondRegular">MONDAY TO FRIDAY<br />9:00 am to 6:00 pm</p>
                <p className="mt-4 text-center font-TypewcondRegular">SATURDAY<br />9:00 am to 12:00 noon</p>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end space-x-4">
                <a href="https://www.linkedin.com/in/saad-khan-aa8035258/" target="_blank">
                    <svg  fill="#EFEDE7" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 24 24" xml:space="preserve">
                        <g id="social-linkedin">
                            <path d="M22.2,0H1.8C0.8,0,0,0.8,0,1.8v20.5c0,1,0.8,1.8,1.8,1.8h20.5c1,0,1.8-0.8,1.8-1.8V1.8C24,0.8,23.2,0,22.2,0z M7.2,20.4
                                H3.5V9h3.6V20.4z M5.3,7.4c-1.1,0-2.1-0.9-2.1-2.1s0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1S6.5,7.4,5.3,7.4z M20.5,20.5h-3.6v-6.3
                                c0-1.8-0.8-2.4-1.8-2.4c-1.1,0-2.1,0.8-2.1,2.5v6.2H9.3V9h3.5v1.6h0c0.3-0.7,1.6-1.9,3.4-1.9c2,0,4.2,1.2,4.2,4.7V20.5z"/>
                        </g>
                    </svg>
                </a>
                <a href="https://www.instagram.com/k4saad/" target="_blank">
                    <svg fill="#EFEDE7" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 24 24" xml:space="preserve">
                        <g id="social-instagram">
                            <path d="M23.9,7.1c-0.1-1.3-0.3-2.1-0.6-2.9C23.1,3.4,22.7,2.7,22,2s-1.3-1.1-2.1-1.4c-0.8-0.3-1.6-0.5-2.9-0.6C15.7,0,15.3,0,12,0
                                S8.3,0,7.1,0.1C5.8,0.1,4.9,0.3,4.1,0.6C3.4,0.9,2.7,1.3,2,2S0.9,3.4,0.6,4.1C0.3,4.9,0.1,5.8,0.1,7.1C0,8.3,0,8.7,0,12
                                s0,3.7,0.1,4.9c0.1,1.3,0.3,2.1,0.6,2.9C0.9,20.6,1.3,21.3,2,22s1.3,1.1,2.1,1.4c0.8,0.3,1.6,0.5,2.9,0.6C8.3,24,8.7,24,12,24
                                s3.7,0,4.9-0.1c1.3-0.1,2.1-0.3,2.9-0.6c0.8-0.3,1.5-0.7,2.1-1.4s1.1-1.3,1.4-2.1c0.3-0.8,0.5-1.6,0.6-2.9C24,15.7,24,15.3,24,12
                                S24,8.3,23.9,7.1z M21.8,16.8c-0.1,1.2-0.2,1.8-0.4,2.2c-0.2,0.6-0.5,1-0.9,1.4s-0.8,0.7-1.4,0.9c-0.4,0.2-1.1,0.4-2.2,0.4
                                c-1.3,0.1-1.6,0.1-4.8,0.1s-3.6,0-4.8-0.1c-1.2-0.1-1.8-0.2-2.2-0.4c-0.6-0.2-1-0.5-1.4-0.9s-0.7-0.8-0.9-1.4
                                c-0.2-0.4-0.4-1.1-0.4-2.2c-0.1-1.3-0.1-1.6-0.1-4.8s0-3.6,0.1-4.8C2.3,6,2.5,5.3,2.6,4.9c0.2-0.6,0.5-1,0.9-1.4s0.8-0.7,1.4-0.9
                                C5.3,2.5,6,2.3,7.2,2.2C8.4,2.2,8.8,2.2,12,2.2s3.6,0,4.8,0.1c1.2,0.1,1.8,0.2,2.2,0.4c0.6,0.2,1,0.5,1.4,0.9s0.7,0.8,0.9,1.4
                                c0.2,0.4,0.4,1.1,0.4,2.2c0.1,1.3,0.1,1.6,0.1,4.8S21.8,15.6,21.8,16.8z"/>
                            <path d="M12,6c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,6,12,6z M12,15.9c-2.2,0-3.9-1.7-3.9-3.9S9.8,8.1,12,8.1s3.9,1.7,3.9,3.9
                                S14.2,15.9,12,15.9z"/>
                            <circle cx="18.5" cy="6" r="1.5"/>
                        </g>
                    </svg>
                </a>
                <a href="https://github.com/k4saad" target="_blank">
                    <svg fill="#EFEDE7" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 24 24" xml:space="preserve">
                        <g id="social-github">
                            <path d="M22.4,6c-1.1-1.8-2.5-3.3-4.4-4.4C16.2,0.5,14.2,0,12,0C9.8,0,7.8,0.5,6,1.6C4.1,2.7,2.7,4.1,1.6,6C0.5,7.8,0,9.8,0,12
                                c0,2.6,0.8,5,2.3,7.1c1.5,2.1,3.5,3.5,5.9,4.3c0.3,0.1,0.5,0,0.6-0.1C9,23.2,9,23,9,22.8c0,0,0-0.3,0-0.8c0-0.5,0-1,0-1.4l-0.4,0.1
                                c-0.2,0-0.5,0.1-0.9,0.1c-0.3,0-0.7,0-1.1-0.1c-0.4-0.1-0.7-0.2-1-0.5c-0.3-0.2-0.6-0.6-0.7-1l-0.2-0.4c-0.1-0.2-0.3-0.5-0.5-0.8
                                c-0.2-0.3-0.5-0.5-0.7-0.6l-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2c0.1,0,0.2-0.1,0.5-0.1
                                l0.3,0c0.2,0,0.5,0.2,0.8,0.4c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.5,0.8,0.9,1c0.3,0.2,0.7,0.3,1,0.3c0.3,0,0.6,0,0.9-0.1
                                C8.6,19.1,8.8,19,9,18.9c0.1-0.7,0.3-1.2,0.8-1.6c-0.6-0.1-1.1-0.2-1.6-0.3c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.6-1.3-1
                                c-0.3-0.4-0.6-1-0.8-1.6c-0.2-0.7-0.3-1.5-0.3-2.3c0-1.3,0.4-2.3,1.2-3.2C5.2,7.2,5.2,6.1,5.7,5C6,4.9,6.4,4.9,7,5.2
                                c0.6,0.2,1,0.4,1.3,0.6C8.6,5.9,8.8,6.1,9,6.2c1-0.3,2-0.4,3-0.4s2,0.1,3,0.4l0.6-0.4C16,5.6,16.5,5.3,17,5.1
                                c0.6-0.2,1-0.3,1.3-0.2c0.5,1.2,0.5,2.2,0.1,3.2c0.8,0.9,1.2,2,1.2,3.2c0,0.9-0.1,1.7-0.3,2.4c-0.2,0.7-0.5,1.2-0.8,1.6
                                c-0.3,0.4-0.8,0.8-1.3,1c-0.5,0.3-1,0.5-1.5,0.6c-0.5,0.1-1,0.2-1.6,0.3c0.5,0.5,0.8,1.2,0.8,2.2v3.3c0,0.2,0.1,0.3,0.2,0.5
                                c0.1,0.1,0.3,0.2,0.6,0.1c2.4-0.8,4.4-2.2,5.9-4.3C23.2,17,24,14.6,24,12C24,9.8,23.5,7.8,22.4,6z"/>
                        </g>
                    </svg>
                </a>
            </div>
        </div>
        <div className="container mx-auto mt-40 text-center">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-[#40FFB5] font-CinzelRegular ">Global Manpower</h1>
        </div>
    </footer>
  );
}

export default Footer;