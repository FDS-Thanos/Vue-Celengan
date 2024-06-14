<template>
  <v-card>
    <v-card-title>Input Data Transfer</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="bank"
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
export default {
  data() {
    return {
      bank: null,
      accountDestination: "",
      amount: "",
      bankOptions: [
        "BCA",
        "BNI",
        "BRI",
        "Mandiri",
        "CIMB Niaga",
        "Bank Danamon",
        "Bank Mega",
        "Bank Permata",
        "Bank OCBC NISP",
        "Bank BTN",
        // Tambahkan bank lainnya sesuai kebutuhan
      ],
    };
  },
  methods: {
    submitForm() {
      // Kirim data yang diinputkan kembali ke komponen utama
      this.$emit("submitForm", {
        bank: this.bank,
        accountDestination: this.accountDestination,
        amount: this.amount,
      });
    },
  },
};
</script>

<style scoped>
/* Gaya kustom Anda di sini */
</style>
