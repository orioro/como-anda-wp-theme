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
</main>
<?php endwhile; ?>

<?php
get_footer();
