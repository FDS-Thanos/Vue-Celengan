<template>
  <v-card>
    <v-card-title>Filter History</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="filterHistory">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="custom-datepicker">
              <label for="tanggalMulai">Tanggal Mulai:</label>
              <input
                type="date"
                id="tanggalMulai"
                v-model="tanggalMulai"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="custom-datepicker">
              <label for="tanggalAkhir">Tanggal Akhir:</label>
              <input
                type="date"
                id="tanggalAkhir"
                v-model="tanggalAkhir"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary">Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-title>Hasil Filter History</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.nama }}</td>
          <td>{{ props.item.tanggal }}</td>
          <td>{{ props.item.jumlah }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tanggalMulai: null,
      tanggalAkhir: null,

      items: [
        { id: 1, nama: "User 1", tanggal: "2024-06-10", jumlah: 10000 },
        { id: 2, nama: "User 2", tanggal: "2024-06-11", jumlah: 15000 },
        { id: 3, nama: "User 3", tanggal: "2024-06-12", jumlah: 12000 },
        { id: 4, nama: "User 4", tanggal: "2024-06-13", jumlah: 8000 },
        { id: 5, nama: "User 5", tanggal: "2024-06-14", jumlah: 11000 },
      ],
      headers: [
        { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "Nama Pengguna", value: "nama" },
        { text: "Tanggal", value: "tanggal" },
        { text: "Jumlah", value: "jumlah" },
      ],
    };
  },
  computed: {
    filteredItems() {
      // Filter items berdasarkan tanggalMulai dan tanggalAkhir
      if (this.tanggalMulai && this.tanggalAkhir) {
        return this.items.filter((item) => {
          const tanggalItem = new Date(item.tanggal);
          return (
            tanggalItem >= new Date(this.tanggalMulai) &&
            tanggalItem <= new Date(this.tanggalAkhir)
          );
        });
      } else {
        return this.items;
      }
    },
  },
  methods: {
    filterHistory() {
      // Metode untuk melakukan filter history, akan dijalankan saat tombol "Filter" ditekan
      console.log(
        "Filter history dari tanggal",
        this.tanggalMulai,
        "sampai tanggal",
        this.tanggalAkhir
      );
    },
  },
};
</script>

<style scoped>
.custom-datepicker {
  margin-bottom: 20px;
}

.custom-datepicker label {
  display: block;
  margin-bottom: 8px;
}

.custom-datepicker input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
