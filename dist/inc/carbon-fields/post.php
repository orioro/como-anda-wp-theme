<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Link')
	->where('post_type', '=', 'post')
  ->add_fields(array(
    Field::make('text', 'ca_post__external_url', 'Link externo')
  ));
