"use client"
import PDF from "./PDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

export default function App() {
  // Create styles

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <PDF/>
      <div style={{width:"100%"}}></div>
      <PDFDownloadLink document={<PDF />} fileName="test.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}
