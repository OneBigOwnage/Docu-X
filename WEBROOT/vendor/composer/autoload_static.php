<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6322403da7e5daa703364b4b7bd39d6c
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'DocuX\\Core\\' => 11,
            'DocuX\\App\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'DocuX\\Core\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'DocuX\\App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6322403da7e5daa703364b4b7bd39d6c::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6322403da7e5daa703364b4b7bd39d6c::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
