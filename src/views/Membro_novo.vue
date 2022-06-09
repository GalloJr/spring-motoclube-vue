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
    <form @submit.prevent="cadastrar">
      <h2>Membros</h2>
      <div class="form-group row">
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          class="form-control"
          required
          autofocus
          v-model="nome"
        />
      </div>
      <div class="form-group row">
        <label for="apelido">Apelido</label>
        <input
          type="text"
          id="apelido"
          class="form-control"
          required
          v-model="apelido"
        />
      </div>
      <div class="form-group row">
        <label for="dataIngresso">Data de ingresso</label>
        <input
          type="date"
          id="dataNascimento"
          class="form-control"
          required
          v-model="dataIngresso"
        />
      </div>
      <div class="form-group row">
        <label for="patente">Patente</label>
        <input
          type="text"
          id="patente"
          class="form-control"
          required
          v-model="patente"
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
  data() {
    return {
      id: "",
      nome: "",
      apelido: "",
      dataIngresso: "",
      patente: "",
      membros: [],
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    cadastrar() {
      if (this.nome.trim().length <= 3) {
        alert("O nome deve ser preenchido corretamente!");
      }
      if (this.patente.trim() <= 10 || this.patente.trim() > 126) {
        alert("Patente não existe!");
      } else {
        axios
          .post("membros/novo", {
            nome: this.nome,
            apelido: this.apelido,
            dataIngresso: this.dataIngresso,
            patente: this.patente,
          })

          .then((res) => {
            console.log(res);
            this.nome = "";
            this.apelido = "";
            this.dataIngresso = "";
            this.patente = "";
            alert("Cadastro efetuado  com sucesso!!!");
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
