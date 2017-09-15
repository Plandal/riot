<exercice if={opts.page=='exercice'}>

        <div class="col-md-10">
	<h1>{ opts.title }</h1>
        </div>
        <div class="col-md-2">
<button id="btnRetour" type="button" class="btn btn-sm btn-success" onclick='window.location.reload(false)'>Retour</button>
</div>
        <div class="col-md-12">
            <p>{ opts.exo }</p>
        </div>
    <div class="col-md-5">
<textarea class="form-control" rows="3"></textarea>
</div>
  <div class="col-md-5">
<button id="evaluer" type="button" class="btn btn-lg btn-primary" data-tag="{opts.tag}">Evaluer</button>
</div>
        

</exercice>