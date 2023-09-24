"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
export default function Pdf() {
  const pdfRef: any = useRef();
  let componentRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas: any) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) * 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  return (
    <>
      <div ref={pdfRef} className="p-2 text-xl font-bold">
        <table width="100%" className="border text-xl">
          <thead>
            <tr>
              <th>a</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>b</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{ width: "1269px" }}
          className="grid grid-cols-1 space-x-1  md:grid-cols-2"
        >
          <div>
            <div className="bg-white mb-2 m-1 p-3 shadow-sm border-t-4 border-blue-500 ">
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                  Status
                </label>
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                  Order No
                </label>
                <span className="mr-4 inline-block  md:block">:</span>
                <div className="flex-1">64f6ad1e82760a2e1886484c</div>
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                  {" "}
                  Created At
                </label>
                <span className="mr-4  md:block">:</span>
                <div className="flex-1">May 5, 2023 at 09:52:54 AM</div>
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                  {" "}
                  Updated At
                </label>
                <span className="mr-4  md:block">:</span>
                <div className="flex-1">September 11, 2023 at 12:42:52 PM</div>
              </div>
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                  {" "}
                  CREATED BY
                </label>
                <span className="mr-4  md:block">:</span>
                <div className="flex-1">undefined undefined</div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-2 m-1 shadow-sm">
              <div className=" flex items-center justify-between leading-none  ">
                <a
                  className="flex items-center no-underline  text-black"
                  href="#"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 496 512"
                    className="float-left  text-5xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                  </svg>
                  <div className="text-xl -mt-3">
                    <div className="text-gray-800 mt-1 font-bold">
                      <span>undefined undefined</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="mt-1 text-gray-800 block  text-sm uppercase tracking-wide">
                CUSTOMER{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF}>Download Pdf</button>
      
    </>
  );
}
