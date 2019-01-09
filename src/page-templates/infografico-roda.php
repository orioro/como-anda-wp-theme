<?php
/**
 * Template name: Infográfico roda
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
<main id="page-template-infografico-roda">
  <template id="ca-infografico-roda-config">
    <?php
    echo json_encode(array(
      'states_geo_json_url' => get_template_directory_uri() . '/js/page-template-infografico-roda/data/br-states-simplified.json',
      'typeform_data_url' => admin_url('admin-post.php?action=get_typeform_data'),
    ));
    ?>
  </template>

  <a
    id="infografico-logo-anchor"
    href="<?php echo get_home_url(); ?>">
    <img
      id="logo-main"
      src="<?php echo get_template_directory_uri(); ?>/resources/logo.svg">
  </a>

  <div id="viz-tooltip"></div>
  
  <div id="stats">
    <h1><span data-bind="percentage"></span>%</h1>
    <h3>
      <strong data-bind="filteredCount"></strong> das <strong data-bind="totalCount"></strong>
    </h3>
    <h3>organizações mapeadas<br>atendem a esses critérios de seleção</h3>
  </div>
  
  <dialog id="entity-details">
    <form method="dialog">  
      <button type="submit">
        x
      </button>
    </form>
    <header>
      <h1 data-bind="Qual o nome da organização da qual faz parte?"></h1>
    </header>
    <section>
      <header>
        <h3>Localização da sede: <span data-bind="Cidade:"></span></h3>
        <p data-bind="Mobilidade a pé é o foco principal da sua organização?"></p>

      </header>
      <h3>O que move a organização:</h3>
      <p data-bind="O que move sua organização?"></p>
      
      <h3>Aspectos da mobilidade a pé:</h3>
      <p data-bind="Com quais aspectos da mobilidade a pé sua organização trabalha ou como o tema está inserido na sua atuação?"></p>
    </section>
    
    <footer>
      <span data-bind="Facebook da organização:"></span>
      <span data-bind="Site da organização:"></span>
    </footer>
  </dialog>
  
  <a id="timeline-link" href="/marcos-da-mobilidade">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/plus.svg" alt="ver mais">
    <div>ver marcos da<br> mobilidade a pé</div>
  </a>
  <a id="know-more-link" href="<?php echo get_home_url(); ?>">saiba mais</a>
  
  <!-- intro -->
  
  <div id="intro-overlay">
    
  </div>
  
  <div id="intro-image-container">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-0.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-1.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-2.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-3.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-4.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-5.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-6.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-7.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-8.svg">
    <img src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/ilustracoes-home-9.svg">
    
    <div class="floor"></div>
  </div>
  
  <div id="intro-container">
    <img class="intro-control previous" src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/arrow-right.svg" alt="previous">
    <img class="intro-control next" src="<?php echo get_template_directory_uri() ?>/js/page-template-infografico-roda/resources/img/arrow-right.svg" alt="next">
    <a href="#" class="intro-skip">pular intro</a>
    
    <div id="intro-text-container">
      <div id="intro-text-scroller">
        <!-- 1 -->
        <p>
          <strong>A pé</strong> é a forma mais democrática, sustentável, saudável e econômica de se deslocar pela cidade.
        </p>
        <!-- 2 -->
        <p>
          Apesar disso, pouco foi feito pela <strong>mobilidade a pé</strong> nas cidades brasileiras.
        </p>
        <!-- 3 -->
        <p>
          De maneira <strong>descentralizada</strong>, nascem organizações com o objetivo de colocar a questão em pauta.
        </p>
        <!-- 4 -->
        <p>
          A partir de <strong>2013</strong>, estimuladas pelo contexto político, social e econômico do país, proliferam iniciativas levantando a bandeira da mobilidade a pé,
        </p>
        <!-- 5 -->
        <p>
          mas a falta de uma <strong>visão integrada</strong> do cenário ainda é uma barreira para que o movimento ganhe força e espaço.
        </p>
        <!-- 6 -->
        <p>
          Neste contexto surge a pesquisa <strong>COMO ANDA</strong>.
        </p>
        <!-- 7 -->
        <p>
          Nós queremos compreender o movimento pela <strong>mobilidade a pé</strong> no Brasil: quem são, onde estão e como atuam os agentes que a promovem.
        </p>
        <!-- 8 -->
        <p>
          Até agora, foram mapeadas <strong><span data-bind="totalCount"></span> organizações</strong>, localizadas em <strong><span data-bind="totalStateCount"></span> estados</strong> pelo Brasil.
        </p>
        <!-- 9 retirado -->
        
        <!-- 10 -->
        <p>
          Descubra a situação das <strong>organizações</strong> mapeadas, identifique atuações, viabilize parcerias e <strong>potencialize</strong> suas ações.
        </p>
        <!-- 11 -->
        <p>
          Navegue e entenda mais sobre o cenário da mobilidade a pé.<br>
          Venha caminhar com a gente!
        </p>
      </div>
    </div>
  </div>
</main>
<?php endwhile; ?>

<?php
get_footer();
