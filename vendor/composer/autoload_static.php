<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf31ecf32077bc03b948e6bc43e8ff017
{
    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'Carbon_Fields\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Carbon_Fields\\' => 
        array (
            0 => __DIR__ . '/..' . '/htmlburger/carbon-fields/core',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf31ecf32077bc03b948e6bc43e8ff017::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf31ecf32077bc03b948e6bc43e8ff017::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
