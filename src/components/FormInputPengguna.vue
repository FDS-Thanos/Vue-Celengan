<template>
  <v-card>
    <v-card-title>Input Data Transfer</v-card-title>
    <v-card-text>
      <!-- Form Transfer Antar Bank -->
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedBank"
              :items="bankOptions"
              label="Pilih Bank Tujuan"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="accountDestination"
              label="Tujuan Rekening"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="amount"
              label="Jumlah (Amount)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="transactionReference"
              label="Referensi Transaksi"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, inject } from "vue";

export default {
  setup() {
    const myAxios = inject("myAxios");

    const selectedBank = ref("");
    const accountDestination = ref("");
    const amount = ref("");
    const transactionReference = ref(""); // Menambahkan ref untuk Transaction Reference
    const bankOptions = ref([]);

    const fetchBankOptions = async () => {
      try {
        const response = await myAxios.get("/transaction/list-bank");
        bankOptions.value = response.data.Data.map((bank) => bank.Name);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data bank:", error);
      }
    };

    const submitForm = async () => {
      try {
        const generateRandomAccountID = () => {
          let result = "";
          const characters = "0123456789";
          const charactersLength = characters.length;
          for (let i = 0; i < 16; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        };

        // Contoh penggunaan

        const formData = {
          AccountID: generateRandomAccountID(), // Ganti dengan Account ID yang sesuai
          Amount: parseFloat(amount.value),
          BankID: selectedBank.value,
          TransactionReference: transactionReference.value,
        };
        const response = await myAxios.post(
          "/transaction/transfer-bank",
          formData
        );
        console.log("Respon dari server:", response.data);
        // Reset form setelah berhasil submit jika perlu
        selectedBank.value = "";
        accountDestination.value = "";
        amount.value = "";
        transactionReference.value = "";
      } catch (error) {
        console.error("Terjadi kesalahan saat mengirim data transfer:", error);
      }
    };

    // Panggil fetchBankOptions saat komponen di-mount
    fetchBankOptions();

    return {
      bankOptions,
      submitForm,
      selectedBank,
      accountDestination,
      amount,
      transactionReference,
    };
  },
};
</script>

<style scoped>
/* Gaya kustom Anda di sini */
</style>
