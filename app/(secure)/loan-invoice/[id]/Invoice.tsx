
import React from 'react'
    import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
const roundThousand=(cmp_rate:any,cp:any)=>{

var str:any=(((cmp_rate/22)*cp).toFixed(0)).toString()
if (str.length>3) {
    
str = str.slice(0, -3)+"000";
}
str = parseInt(str);
return str
}

    const Invoice = (
        {loan,rates,rate}:any
        ) => {


            const actual_karat=(gold_percentage:any):any=>{
           if(rate?.cmp_rate){
             if(gold_percentage >= 109.09){
               return {karat:"24",value:  roundThousand(rate.cmp_rate,24)}
             } else if(gold_percentage >= 100 && gold_percentage < 109.09) {
               return {karat:"22",value:roundThousand(rate.cmp_rate,22)}
             }else if(gold_percentage >= 95.45 && gold_percentage < 100) {
               return {karat:"21",value:roundThousand(rate.cmp_rate,21)}
             } else if(gold_percentage >= 90.91 && gold_percentage < 95.45) {
               return {karat:"20",value:roundThousand(rate.cmp_rate,20)}
             } else if(gold_percentage >= 86.36 && gold_percentage < 90.91) {
               return {karat:"19",value:roundThousand(rate.cmp_rate,19)}
             } else if(gold_percentage >= 81.82 && gold_percentage < 86.36) {
               return {karat:"18",value:roundThousand(rate.cmp_rate,18)}
             } else if(gold_percentage >= 77.27 && gold_percentage < 81.82) {
               return {karat:"17",value:roundThousand(rate.cmp_rate,17)}
             } else if(gold_percentage >= 72.73 && gold_percentage < 77.27) {
               return {karat:"16",value:roundThousand(rate.cmp_rate,16)}
             } else if(gold_percentage >= 68.18 && gold_percentage < 72.73) {
               return {karat:"15",value:roundThousand(rate.cmp_rate,15)}
             } else if(gold_percentage >= 63.64 && gold_percentage < 68.18) {
               return {karat:"14",value:roundThousand(rate.cmp_rate,14)}
             } else if(gold_percentage >= 59.09 && gold_percentage < 63.64) {
               return {karat:"13",value:roundThousand(rate.cmp_rate,13)}
             } else if(gold_percentage >= 54.55 && gold_percentage < 59.09) {
               return {karat:"12",value:roundThousand(rate.cmp_rate,12)}
             } else {
               return {karat:"Less than 12 karat",value:0}
             }
           }else{
             return {karat:"",value:0}
           }
           
           }
   const amountValue=(receipt:any)=>{
    const pound:any=parseFloat(receipt.pound).toFixed(4)
   return actual_karat(receipt?.net_weight/receipt?.total_weight*100).value*pound

   }



            
        const arr =loan?  loan?.items : [];


  
        const total_mx = arr.reduce(function (acc: any, obj: any) {
            const fValue:any=parseFloat(obj.pound).toFixed(8)
            return (
              acc + ((parseFloat(obj.per_pound) ? parseFloat(obj.per_pound) : 0) *(fValue ? fValue : 0))
            );
          }, 0);



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
            cellsp: { fontSize: 10,whiteSpace: "nowrap" },

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
                        
                        <Text style={styles.invoiceNumber3}>Excepted Amount{``}:{`  `} {total_mx.toFixed(2)} </Text>
                        <Text style={styles.invoiceNumber3}>Given Amount{`       `}:{`  `} {loan?.loan_amount} </Text>
                        <Text style={styles.invoiceNumber}>Installment{`           `}:{`  `} {loan?.monthly_installment} </Text>
                        <Text style={styles.invoiceNumber}>No of Month{`         `}:{`  `} {loan?.no_of_month} </Text>
                    </View>
                    <View>
                        <Text style={styles.invoiceNumber2}>Full Name{`     `}:{`  `} {loan?.customer[0]?.fullName} </Text>
                        <Text style={styles.invoiceNumber}>NIC{`               `}:{`  `} {loan?.customer[0]?.nic} </Text>
                        <Text style={styles.invoiceNumber}>Loan Start{`    `}:{`  `} {loan?.first_installment} </Text>
                        <Text style={styles.invoiceNumber}>Loan End{`     `}:{`  `} {loan?.last_installment} </Text>
                       
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
                    <Text>Amount </Text>   
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
                    <Text >Basic Amount (with company rate)</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat(rate?.cmp_rate).toFixed(2)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{total_pounds.toFixed(4)}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{parseFloat((total_pounds*rate?.cmp_rate).toString()).toFixed(2)}</Text>   
                </View>
            </View>
            <View style={{ width:'100%', flexDirection :'row'}} >
                <View  style={[styles.tbody, styles.tbody2]}>
                    <Text >Basic Amount (with market price)</Text>   
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
            <Text>{total_mx.toFixed(2)}</Text>   
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
                         <Text >PER POUND : </Text>   
                         <Text>LKR {(actual_karat(receipt?.net_weight/receipt?.total_weight*100)).value}</Text>
                     </View>
                     <View style={[styles.tbody]}>
                        <Text  style={[styles.cellsp]}>
                            {amountValue(receipt)}  
                            </Text>   
                     </View>
                     <View style={[styles.tbody]}>
                         <Text >GIVEN&nbsp; : {receipt.karat}</Text>   
                         <Text >ACTUAL : {(actual_karat(receipt?.net_weight/receipt?.total_weight*100)).karat}</Text>   
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