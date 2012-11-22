<!DOCTYPE HTML>
<html lang="pt-BR">
<head>
	<meta charset="ISO-8859-1">
	<title>CD-ROM Framework</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/estilo.css">
</head>
<body>
	<header>
		<h1>CD-ROM Framework</h1>
	</header>
	<div class="container">
		<p>
			<a href="cd/fotos.rar" class="btn btn-large">CD/DVD de Fotos</a>
			<a href="cd/fotos/" class="btn btn-large btn-laranja">Demo</a>
		</p>
		<p>
			<a href="cd/albuns.rar" class="btn btn-large">CD/DVD de Álbuns</a>
			<a href="cd/albuns/" class="btn btn-large btn-laranja">Demo</a>
		</p>
		<p>
			<a href="cd/videos.rar" class="btn btn-large">CD/DVD de Vídeos</a>
			<a href="cd/videos/" class="btn btn-large btn-laranja">Demo</a>
		</p>
		<p>
			<a href="cd/especial.rar" class="btn btn-large">CD/DVD Especial</a>
			<a href="cd/especial/" class="btn btn-large btn-laranja">Demo</a>
		</p>
		<p>
			<a href="cd/capas-bolachas/" class="btn btn-large">CD/DVD Capas/Bolachas</a>
		</p>
	</div>
	<footer>
		
	</footer>

 
	<?php
	/*	
	$diretorio = 'cd/'; 
	$ponteiro  = opendir($diretorio);
	while ($nome_itens = readdir($ponteiro)) {
	    $itens[] = $nome_itens;
	}

	sort($itens);
	foreach ($itens as $listar) {
	   if ($listar!="." && $listar!=".."){ 
	   		if (is_dir($listar)) { 
				$pastas[]=$listar; 
			} else{ 
				$arquivos[]=$listar;
			}
	   }
	}

	if ($arquivos != "") {
		foreach($arquivos as $listar){

		   	// pega o endereço do diretório
			$diretorio = 'cd/'.$listar; 
			echo $diretorio.'<br>';

			// inicializa a classe ZipArchive
			$zip = new ZipArchive();
			// abre o arquivo .zip
			if ($zip->open($listar.".rar", ZIPARCHIVE::CREATE) !== TRUE) {
			die ("Erro!");
			}

			$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($diretorio));
			echo $iterator;

			// itera cada pasta/arquivo contido no diretório especificado
			foreach ($iterator as $key=>$value) {
			// adiciona o arquivo ao .zip
			$zip->addFile(realpath($key), iconv('ISO-8859-1', 'IBM850', $key)) or die ("ERRO: Não é possível adicionar o arquivo: $key");
			}
			// fecha e salva o arquivo .zip gerado
			$zip->close();
		}

    }
    */

	?>
</body>
</html>