<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('mail:test {email}', function (string $email) {
    $this->info('mailer: ' . config('mail.default')
        . ' | host: ' . config('mail.mailers.smtp.host')
        . ':' . config('mail.mailers.smtp.port')
        . ' | from: ' . config('mail.from.address'));

    try {
        Mail::raw('DRRT-IMS test email. If you can read this, mail is configured correctly.', function ($message) use ($email) {
            $message->to($email)->subject('DRRT-IMS mail test');
        });
        $this->info('Sent to ' . $email);
    } catch (\Throwable $e) {
        $this->error(get_class($e) . ': ' . $e->getMessage());
    }
})->purpose('Send a test email to verify mail configuration');
