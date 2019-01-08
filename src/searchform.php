<?php
/**
 * default search form
 */
?>

<div
  class="ca-search-form-container <?php if (is_search()) { echo 'active'; } ?>">
  <form
    role="search"
    method="get"
    class="ca-search-form"
    action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <input
    	name="s"
    	value="<?php echo esc_attr( get_search_query() ); ?>"
    	placeholder="Buscar por palavra" />
    <button type="submit"></button>
  </form>
</div>
