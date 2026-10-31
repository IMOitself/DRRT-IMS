FROM composer:2 AS vendor
WORKDIR /app
COPY . .
RUN composer install --no-dev --optimize-autoloader

FROM php:8.5-apache
RUN apt-get update && apt-get install -y libpq-dev \
 && docker-php-ext-install pdo pdo_pgsql
RUN a2enmod rewrite
COPY --from=vendor /app /var/www/html
WORKDIR /var/www/html
RUN sed -i 's/80/8080/g' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf \
 && sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-enabled/000-default.conf \
 && chown -R www-data:www-data storage bootstrap/cache
EXPOSE 8080
# CMD php artisan migrate --force && apache2-foreground
CMD php artisan migrate:fresh --seed --force && apache2-foreground