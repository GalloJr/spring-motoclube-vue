<template>
  <div class="card-body">
    <div class="col-lg-12" style="text-align: right;">
      <router-link
        class=" glyphicon glyphicon-plus btn-lg "
        to="/membronovo"
        aria-label="Alinhar na esquerda"
        style="color:blue"
      >
        Adicionar</router-link
      >
    </div>

    <div>
      <form
        class="form-inline md-form mr-auto mb-4"
        @submit.prevent="buscarApelido"
      >
        <div class="form-group">
          <label for="apelido"></label>
          <input
            type="text"
            id="apelido"
            class="form-control"
            required
            v-model="apelido"
          />
        </div>

        <button
          class="btn-info glyphicon glyphicon-search btn-lg"
          type="submit"
          v-on:click="buscarApelido(apelido)"
        >
          Apelido
        </button>
      </form>
    </div>

    <table id="membro" class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Apelido</th>
          <th>Data de ingresso</th>
          <th>Patente</th>
          <th class="actions">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ membro.id }}</td>
          <td>{{ membro.nome }}</td>
          <td>{{ membro.apelido }}</td>
          <td>{{ membro.dataIngresso }}</td>
          <td>{{ membro.patente }}</td>
          <button
            v-if="autorizacao === '[ROLE_ADMIN]'"
            class=" glyphicon glyphicon-trash mr-1"
            type="submit"
            style="color:red"
            v-on:click="excluir(membro.patente, membro.id)"
          ></button>

          <button
            type="button"
            class="glyphicon glyphicon-pencil mr-1"
            v-on:click="editar(membro.apelido)"
            style="color:blue"
          >
            <span class="glyphicon glyphicon" aria-hidden="true"></span>
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "teste",
  props: {
    app: {
      type: String,
      default: "Estranho",
    },
  },

  data() {
    return {
      membro: {
        id: "",
        nome: "",
        apelido: "",
        dataIngresso: "",
        patente: "",
      },
    };
  },
  computed: {
    ...mapState(["usuario", "autorizacao"]),
  },
  methods: {
    buscarApelido(apelido) {
      axios
        .get("/membros/buscaapelido/" + apelido, {
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          console.log(res);

          this.membro = res.data;
          if (this.membro.trim().length == 0) {
            alert("Patente sem membro cadastrado !");
          }
        })
        .catch((error) => console.log(error));
    },
    excluir(patente, id) {
      var resposta = confirm("Deseja remover esse registro?");
      if (resposta == true) {
        axios
          .delete("/membros/delete/" + id)
          .then((response) => {
            this.membros.splice(id, 1);
            this.buscar(patente);
            this.patente = "";

            console.log(response);
          })
          .catch((error) => console.log(error));
      }
    },

    editar(membro) {
      this.$router.push("/membroeditar/" + membro);
    },
  },
  created() {
    this.buscarApelido(this.apelido);
    this.apelido = "";
  },
};
</script>
