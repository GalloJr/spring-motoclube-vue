<template>
  <div class="card-body">
    <div class="col-lg-12" style="text-align: right;">
      <router-link
        class=" glyphicon glyphicon-plus btn-lg "
        to="/membros"
        aria-label="Alinhar na esquerda"
        style="color:blue"
      >
        Anterior</router-link
      >
    </div>
    <form @submit.prevent="editar">
      <h2>Membros</h2>
      <div class="form-group row">
        <label for="id">id</label>
        <input
          type="number"
          id="id"
          class="form-control"
          required
          autofocus
          v-model="membro.id"
          readonly
        />
      </div>

      <div class="form-group row">
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          class="form-control"
          required
          autofocus
          v-model="membro.nome"
        />
      </div>
      <div class="form-group row">
        <label for="apelido">Apelido</label>
        <input
          type="text"
          id="apelido"
          class="form-control"
          required
          v-model="membro.apelido"
        />
      </div>
      <div class="form-group row">
        <label for="dataIngresso">Data de ingresso</label>
        <input
          type="date"
          id="dataIngresso"
          class="form-control"
          required
          v-model="membro.dataIngresso"
        />
      </div>
      <div class="form-group row">
        <label for="patente">Patente</label>
        <input
          type="text"
          id="patente"
          class="form-control"
          required
          v-model="membro.patente"
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Salvar
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "membro",
  props: {
    morador: {
      type: null,
      default: { id: "33" },
    },
  },

  data() {
    return {
      id: "",
      nome: "",
      apelido: "",
      dataIngresso: "",
      patente: "",
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    editar() {
      if (this.membro.nome.trim().length <= 3) {
        alert("O nome deve ser preenchido corretamente!");
      }
      if (
        this.membro.patente.trim() <= 10 ||
        this.membro.patente.trim() > 126
      ) {
        alert("Patente não existe!");
      } else {
        axios
          .put("membros/atualizar/" + this.membro.id, {
            id: this.membro.id,
            nome: this.membro.nome,
            apelido: this.membro.apelido,
            dataIngresso: this.membro.dataIngresso,
            patente: this.membro.patente,
          })
          .then((res) => {
            console.log(res);
            this.membro.id = "";
            this.membro.nome = "";
            this.membro.apelido = "";
            this.membro.dataIngresso = "";
            this.membro.patente = "";
            alert("Membro alterado com sucesso!!!");
          })
          .catch((error) => console.log(error));
      }
    },
    buscarApelido(apelido) {
      axios
        .get("/membros/buscaapelido/" + apelido, {
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          console.log(res);

          this.membro = res.data;
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.buscarApelido(this.membro);
  },
};
</script>
