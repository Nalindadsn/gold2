
import React from 'react'
    import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

    const Invoice = (
        {loan,rates}:any
        ) => {

            
        const arr =loan?  loan?.items : [];

        const total_pounds = arr.reduce(function (acc: any, obj: any) {
          return (
            acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0) / 8
          );
        }, 0);
        const itm_total_net = arr.reduce(function (acc: any, obj: any) {
          return acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0);
        }, 0);
        const itm_total_weight = arr.reduce(function (acc: any, obj: any) {
          return (
            acc + (parseFloat(obj.total_weight) ? parseFloat(obj.total_weight) : 0)
          );
        }, 0);

        const company_rates= rates

     

          const styles = StyleSheet.create({
            page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },
    
            spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },
    
            titleContainer: {flexDirection: 'row',marginTop: 24},
            
            logo: { width: 90 },
    
            reportTitle: {border:1,paddingTop:"10px", paddingLeft:"10px",paddingRight:"10px",  fontSize: 25,fontWeight:"bold",whiteSpace: "nowrap" },
    
            addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
            
            invoice : {fontWeight: 'bold',fontSize: 20},
            
            invoiceNumber : {fontSize: 11,fontWeight: 'bold',borderBottom:"1px solid whitesmoke"}, 
            invoiceNumber2 : {fontSize: 11,fontWeight: 'bold',marginTop:"3px",borderBottom:"1px solid whitesmoke"}, 
            invoiceNumber3 : {fontSize: 11,fontWeight: 'bold',marginTop:"3px",borderBottom:"1px solid whitesmoke"}, 
            
            address : { fontWeight: 400, fontSize: 10},
            
            theader : {fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},
            theader3 : {fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},
    
            theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1,textAlign:"left"},
    
            tbody:{ fontSize : 9,textAlign:"right", paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1,borderBottom:1},
    
            total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},
    
            tbody2:{ flex:2, borderRightWidth:1,textAlign:"left" }
            
        });

        const InvoiceTitle = () => (
            <></>
        );const Address = () => (
            <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <View>
                        <Text style={styles.invoice }>BACKEND REPORT </Text>
                    <Text style={styles.invoiceNumber}>Invoice number{`    `}:{`  `} {loan?.id} </Text>
                        <Text style={styles.invoiceNumber}>Form number{`       `}:{`  `} {loan?.form_number} </Text>

                        <Text style={styles.invoiceNumber3}>Loan Amount{`       `}:{`  `} {loan?.loan_amount} </Text>
                        <Text style={styles.invoiceNumber}>Installment{`           `}:{`  `} {loan?.monthly_installment} </Text>
                        <Text style={styles.invoiceNumber}>No of Month{`         `}:{`  `} {loan?.no_of_month} </Text>
                    </View>
                    <View>
                        <Text style={styles.invoiceNumber2}>Full Name{`            `}:{`  `} {loan?.customer[0]?.fullName} </Text>
                        <Text style={styles.invoiceNumber}>NIC{`                      `}:{`  `} {loan?.customer[0]?.nic} </Text>
                       
                    <Text style={styles.reportTitle}>GOLD LOAN</Text>
                    </View>
                    <View>

                    </View>
                </View>
            </View>
        );
        
        // const UserAddress = () => (
        //     <View style={styles.titleContainer}>
        //         <View style={styles.spaceBetween}>
        //             <View style={{maxWidth : 200}}>
        //                 <Text style={styles.addressTitle}>Bill to </Text>
        //                 <Text style={styles.address}>
        //                     {loan?.id}
        //                 </Text>
        //             </View>
        //             <Text style={styles.addressTitle}>{reciept_data.date}</Text>
        //         </View>
        //     </View>
        // );

        const TableHead = () => (
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View style={[styles.theader, styles.theader2]}>
                    <Text >Items</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Karat</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Total Weight</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Net Weight </Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Pounds </Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Condition </Text>   
                </View>
            </View>
        );
        const TableHeadMarketOld = () => (
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View style={[styles.theader, styles.theader2]}>
                    <Text ></Text>   
                </View>
                <View style={styles.theader}>
                    <Text>PER POUND </Text>   
                </View>
                <View style={styles.theader}>
                    <Text>1 POUND</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>TOTAL AMOUNT</Text>   
                </View>
            </View>
        );
        const TableBodyMarketOld = () => (
            <>
            
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Market Price</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(loan?.estimated_price_old/total_pounds).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                <Text>{parseFloat(loan?.estimated_price_old).toFixed(2)}</Text>   
                </View>
            </View>
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Issued Amount</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(loan?.loan_price_old/total_pounds).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                <Text>{parseFloat(loan?.loan_price_old).toFixed(2)}</Text>   
                </View>
            </View>
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Expected Amount</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(loan?.requested_loan/total_pounds).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat(loan?.requested_loan).toFixed(2)}</Text>   
                </View>
            </View>
            </>
        );
        const TableBodyMarketPrice = () => (
            <>
            
            {company_rates?.map((i:any)=>(
            <>
            <View style={{ width:'100%', flexDirection :'row'}} key={i._id}>
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >{i?.company}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat(i?.gold_rate).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat(total_pounds).toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(i?.gold_rate*total_pounds).toFixed(2)}</Text>   
                </View>
            </View>
            </>
            ))}
            </>
        );
        const TableBodyLoan = () => (
            <>
            
            <>
            <View style={{ width:'100%', flexDirection :'row'}} >
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Basic</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(130000).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(total_pounds*130000).toFixed(2)}</Text>   
                </View>
            </View>
            <View style={{ width:'100%', flexDirection :'row'}} >
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Basic</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{(parseFloat(loan?.expected_price_old)/total_pounds).toFixed(2)}
                 </Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat(loan?.expected_price_old).toFixed(2)}</Text>   
                </View>
            </View>
            </>
            </>
        );
      const TblTotal=()=>(
        
        <View style={{ width:'100%', flexDirection :'row',textAlign:"right"}}>
        <View style={[styles.theader, styles.theader2]}>
            <Text >Total</Text>   
        </View>
        <View style={styles.theader}>
            <Text></Text>   
        </View>
        <View style={styles.theader3}>
            <Text>{itm_total_net.toFixed(4)}</Text>   
        </View>
        <View style={styles.theader3}>
            <Text>{itm_total_weight.toFixed(4)} </Text>   
        </View>
        <View style={styles.theader3}>
            <Text>{total_pounds.toFixed(4)} </Text>   
        </View>
        <View style={styles.theader}>
            <Text> </Text>   
        </View>
    </View>
      )

        const TableBody = () => (
            loan?.items?.map((receipt:any)=>(
            <>
            
             <React.Fragment key={receipt.id}>
                 <View style={{ width:'100%', flexDirection :'row'}}>
                     <View style={[styles.tbody, styles.tbody2]}>
                         <Text >{receipt.name}</Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >{receipt.karat}</Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >{parseFloat(receipt.total_weight).toFixed(4)}</Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >{parseFloat(receipt.net_weight).toFixed(4)}</Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >{parseFloat(receipt.pound).toFixed(4)}</Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >{receipt.status}</Text>   
                     </View>
                     {/* <View style={styles.tbody}>
                         <Text>{receipt.price} </Text>   
                     </View>
                     <View style={styles.tbody}>
                         <Text>{receipt.qty}</Text>   
                     </View>
                     <View style={styles.tbody}>
                         <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>   
                     </View> */}
                 </View>
             </React.Fragment>
             
            </>
            ))
         );

      return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle  />
                    <Address/>
                    {/* <UserAddress/> */}
                    
                    <View style={{marginTop:"20px"}}><Text>Items</Text></View>
                    <TableHead/>
                    <TableBody/>
                    <TblTotal/>
                    <View style={{marginTop:"20px"}}><Text>Market Price (OLD)</Text></View>
                    <TableHeadMarketOld/>
                    <TableBodyMarketOld/>
                    <View  style={{marginTop:"20px"}}><Text>Market Price (CURRENT)</Text></View>
                    <TableHeadMarketOld/>
                    <TableBodyMarketPrice/>
                    <View  style={{marginTop:"20px"}}><Text>Loan (CURRENT)</Text></View>
                    <TableHeadMarketOld/>
                    <TableBodyLoan/>
                </Page>
            </Document>
      )
    }
    export default Invoice