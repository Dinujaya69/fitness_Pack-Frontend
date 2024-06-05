import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import UserTable from "./UserTable"; // Adjust the import as necessary

const PDFDocument = ({ users }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.page}>
            <View>
              <Text style={styles.title}>Member Details Report</Text>
              <UserTable users={users} />
            </View>
          </Page>
        </Document>
      }
      fileName="member_report.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default PDFDocument;
