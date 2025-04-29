document.addEventListener("DOMContentLoaded", () => {
	console.log("Iniciando o processo de fetch dos dados...");

	function formatarDataParaBR(data) {
		if (!data) return "—"; // Se não houver data, retorna o caractere padrão "—"

		const d = new Date(data);
		const dia = String(d.getDate()).padStart(2, "0");
		const mes = String(d.getMonth() + 1).padStart(2, "0");
		const ano = d.getFullYear();

		return `${dia}/${mes}/${ano}`;
	}

	// Realiza o fetch dos dados
	fetch("data/data.json")
		.then((res) => {
			if (!res.ok) {
				throw new Error("Falha ao carregar os dados");
			}
			return res.json();
		})
		.then((dados) => {
			try {
				console.log("Dados carregados:", dados);

				// Verificação para garantir que dados.clube existe antes de acessar suas propriedades
				const clube = dados.clube || {};

				// Exibe dados básicos com verificação de existência
				document.getElementById("fundacao").textContent = formatarDataParaBR(clube.fundacao);
				document.getElementById("nome-time").textContent = clube.nome;
				document.getElementById("cores-time").textContent = clube.cores?.join(", ");

				// Atualiza contadores de resultados
				document.getElementById("vitorias").textContent = clube.vitorias;
				document.getElementById("empates").textContent = clube.empates;
				document.getElementById("derrotas").textContent = clube.derrotas;

				// Exibe elenco
				const tabelaJogadores = document.getElementById("tabela-jogadores");
				if (dados.elenco && dados.elenco.length > 0) {
					console.log("Exibindo elenco de jogadores...");
					dados.elenco.forEach((jogador) => {
						console.log("Jogador:", jogador);
						const linha = document.createElement("tr");
						linha.innerHTML = `
							<td>${jogador.nome || "—"}</td>
							<td>${jogador.posicao || "—"}</td>
							<td>${jogador.idade || "—"}</td>
						`;
						tabelaJogadores.appendChild(linha);
					});
				} else {
					console.log("Nenhum jogador encontrado.");
				}

				// Exibe partidas
				const partidas = dados.partidas || [];

				partidas.forEach((p) => {
					// Exibição de todas as partidas na tabela
					const tabelaPartidas = document.getElementById("tabela-partidas");
					const linha = document.createElement("tr");

					linha.innerHTML = `
						<td>${formatarDataParaBR(p.data) || "—"}</td>
						<td>${p.adversario || "—"}</td>
						<td>${p.tipo || "—"}</td>
						<td>${p.resultado || "—"}</td>
					`;
					tabelaPartidas.appendChild(linha);
				});

				// Filtro de partidas por período
				document
					.getElementById("btn-filtrar")
					.addEventListener("click", () => {
						const dataInicio =
							document.getElementById("data-inicio").value;
						const dataFim =
							document.getElementById("data-fim").value;

						// Converte para Date e verifica validade
						const inicio = dataInicio ? new Date(dataInicio) : null;
						const fim = dataFim ? new Date(dataFim) : null;

						// Limpa a tabela antes de adicionar as filtradas
						const tabelaPartidas =
							document.getElementById("tabela-partidas");
						tabelaPartidas.innerHTML = "";

						const partidasFiltradas = partidas.filter((p) => {
							const dataPartida = new Date(p.data);
							if (inicio && dataPartida < inicio) return false;
							if (fim && dataPartida > fim) return false;
							return true;
						});

						partidasFiltradas.forEach((p) => {
							const linha = document.createElement("tr");
							linha.innerHTML = `
								<td>${formatarDataParaBR(p.data) || "—"}</td>
								<td>${p.adversario || "—"}</td>
								<td>${p.tipo || "—"}</td>
								<td>${p.resultado || "—"}</td>
							`;
							tabelaPartidas.appendChild(linha);
						});
					});

				// Exibe outras informações como cards
				const outrasInfos = dados.outrasInformacoes || [];
				const containerOutrasInfos = document.getElementById("container-outras-informacoes");

				// Limpa conteúdo anterior
				containerOutrasInfos.innerHTML = "";

				if (outrasInfos.length === 0) {
					containerOutrasInfos.innerHTML = "<p>Sem outras informações disponíveis.</p>";
				} else {
					outrasInfos.forEach((item) => {
						const chave = Object.keys(item).find((k) => k !== "img");
						const valor = item[chave];
						const img = item.img;

						const col = document.createElement("div");
						col.className = "col-md-4 mb-3";

						col.innerHTML = `
						<div class="card h-100 shadow-sm bg-dark bg-opacity-75 text-white">
							${img ? `<img src="${img}" class="card-img-top" alt="${chave}">` : ""}
							<div class="card-body">
							<h5 class="card-title">${chave.replace(/_/g, " ")}</h5>
							<p class="card-text">${valor}</p>
							</div>
						</div>
						`;
						containerOutrasInfos.appendChild(col);
					});
				}


				// Exibe transferências
				const transferencias = dados.transferencias || [];
				const tabelaTransferencias = document.getElementById(
					"tabela-tranferencia"
				);

				// Limpa conteúdo anterior
				tabelaTransferencias.innerHTML = "";

				if (transferencias.length === 0) {
					tabelaTransferencias.innerHTML =
						"<tr><td colspan='5'>Nenhuma transferência registrada.</td></tr>";
				} else {
					transferencias.forEach((transferencia) => {
						const linha = document.createElement("tr");
						linha.innerHTML = `
              <td>${formatarDataParaBR(transferencia.data_transferencia) || "—"
							}</td>
              <td>${transferencia.de || "—"}</td>
              <td>${transferencia.para || "—"}</td>
              <td>${transferencia.jogador || "—"}</td>
              <td>${transferencia.valor || "—"}</td>
            `;
						tabelaTransferencias.appendChild(linha);
					});
				}
			} catch (error) {
				console.error("Erro ao processar os dados:", error);
				alert(
					"Ocorreu um erro ao processar os dados. Tente novamente mais tarde."
				);
			}
		})
		.catch((error) => {
			console.error("Erro ao carregar dados:", error);
			alert(
				"Ocorreu um erro ao carregar os dados. Tente novamente mais tarde."
			);
		});
});
