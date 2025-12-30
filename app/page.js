import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
import InputInstallment from "@/components/input/installment";
import { Grid, GridItem } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem>
            <Header />
          </GridItem>
          <GridItem>
            <InputInstallment />
            <Toaster />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
