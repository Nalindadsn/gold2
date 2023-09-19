"use client"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PDF = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  return (
    <Document>
      {/** Page defines a single page of content. */}
      <Page size="A4" style={styles.page}>
        
        <View style={styles.section}>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique rerum, temporibus itaque nam laborum maiores maxime aperiam expedita sint illo sequi voluptas quas odit repudiandae cumque neque suscipit dolor vel.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
