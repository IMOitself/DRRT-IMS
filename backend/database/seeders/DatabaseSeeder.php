<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use App\Models\Attendance;
use App\Models\MembershipApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ==========================================
        // 1. adviser
        // ==========================================
        User::create([
            'name' => 'Kethleen Onato',
            'email' => 'kethleenonato@dummy.com',
            'password' => 'foundingtitan',
            'role' => 'adviser',
        ]);

        // ==========================================
        // 2. officers - 3
        // ==========================================
        $officer1 = User::create([
            'name' => 'Smith, Erwin',
            'email' => 'captain.erwin@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $officer1->id,
            'student_id' => '2026-00001',
            'last_name' => 'Smith',
            'first_name' => 'Erwin',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 4,
            'email' => $officer1->email,
            'phone_number' => '09111111111',
            'emergency_person_name' => 'Marie Smith',
            'emergency_phone' => '09222222221',
            'consent_form' => 'consent_forms/erwin-smith.pdf',
        ]);

        $officer2 = User::create([
            'name' => 'Ackerman, Levi',
            'email' => 'captain.levi@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $officer2->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00002',
            'last_name' => 'Ackerman',
            'first_name' => 'Levi',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 4,
            'email' => $officer2->email,
            'phone_number' => '09111111112',
            'emergency_person_name' => 'Kenny Ackerman',
            'emergency_phone' => '09222222222',
            'consent_form' => 'consent_forms/levi-ackerman.pdf',
        ]);

        $officer3 = User::create([
            'name' => 'Zoe, Hange',
            'email' => 'commander.hange@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'officer',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $officer3->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00003',
            'last_name' => 'Zoe',
            'first_name' => 'Hange',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 4,
            'email' => $officer3->email,
            'phone_number' => '09111111113',
            'emergency_person_name' => 'Moblit Berner',
            'emergency_phone' => '09222222223',
            'consent_form' => 'consent_forms/hange-zoe.pdf',
        ]);

        // ==========================================
        // 3. members - 27
        // ==========================================
        $member1 = User::create([
            'name' => 'Yeager, Eren G.',
            'email' => 'eren.yeager@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member1->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00101',
            'last_name' => 'Yeager',
            'first_name' => 'Eren',
            'middle_name' => 'Grisha',
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member1->email,
            'phone_number' => '09170000101',
            'emergency_person_name' => 'Carla Yeager',
            'emergency_phone' => '09180000101',
            'consent_form' => 'consent_forms/eren-yeager.pdf',
        ]);

        $member2 = User::create([
            'name' => 'Ackerman, Mikasa',
            'email' => 'mikasa.ackerman@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member2->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00102',
            'last_name' => 'Ackerman',
            'first_name' => 'Mikasa',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 2,
            'email' => $member2->email,
            'phone_number' => '09170000102',
            'emergency_person_name' => 'Eren Yeager',
            'emergency_phone' => '09180000102',
            'consent_form' => 'consent_forms/mikasa-ackerman.pdf',
        ]);

        $member3 = User::create([
            'name' => 'Arlert, Armin',
            'email' => 'armin.arlert@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member3->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00103',
            'last_name' => 'Arlert',
            'first_name' => 'Armin',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member3->email,
            'phone_number' => '09170000103',
            'emergency_person_name' => 'Grandpa Arlert',
            'emergency_phone' => '09180000103',
            'consent_form' => 'consent_forms/armin-arlert.pdf',
        ]);

        $member4 = User::create([
            'name' => 'Kirstein, Jean',
            'email' => 'jean.kirstein@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member4->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00104',
            'last_name' => 'Kirstein',
            'first_name' => 'Jean',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 2,
            'email' => $member4->email,
            'phone_number' => '09170000104',
            'emergency_person_name' => 'Mrs. Kirstein',
            'emergency_phone' => '09180000104',
            'consent_form' => 'consent_forms/jean-kirstein.pdf',
        ]);

        $member5 = User::create([
            'name' => 'Braus, Sasha A.',
            'email' => 'sasha.braus@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member5->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00105',
            'last_name' => 'Braus',
            'first_name' => 'Sasha',
            'middle_name' => 'Artur',
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member5->email,
            'phone_number' => '09170000105',
            'emergency_person_name' => 'Artur Braus',
            'emergency_phone' => '09180000105',
            'consent_form' => 'consent_forms/sasha-braus.pdf',
        ]);

        $member6 = User::create([
            'name' => 'Springer, Connie',
            'email' => 'connie.springer@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member6->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00106',
            'last_name' => 'Springer',
            'first_name' => 'Connie',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 2,
            'email' => $member6->email,
            'phone_number' => '09170000106',
            'emergency_person_name' => ' Mrs. Springer',
            'emergency_phone' => '09180000106',
            'consent_form' => 'consent_forms/connie-springer.pdf',
        ]);

        $member7 = User::create([
            'name' => 'Braun, Reiner',
            'email' => 'reiner.braun@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member7->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00107',
            'last_name' => 'Braun',
            'first_name' => 'Reiner',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 3,
            'email' => $member7->email,
            'phone_number' => '09170000107',
            'emergency_person_name' => 'Karina Braun',
            'emergency_phone' => '09180000107',
            'consent_form' => 'consent_forms/reiner-braun.pdf',
        ]);

        $member8 = User::create([
            'name' => 'Hoover, Bertholdt',
            'email' => 'bertholdt.hoover@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member8->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00108',
            'last_name' => 'Hoover',
            'first_name' => 'Bertholdt',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 3,
            'email' => $member8->email,
            'phone_number' => '09170000108',
            'emergency_person_name' => 'Reiner Braun',
            'emergency_phone' => '09180000108',
            'consent_form' => 'consent_forms/bertholdt-hoover.pdf',
        ]);

        $member9 = User::create([
            'name' => 'Leonhart, Annie',
            'email' => 'annie.leonhart@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member9->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00109',
            'last_name' => 'Leonhart',
            'first_name' => 'Annie',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 3,
            'email' => $member9->email,
            'phone_number' => '09170000109',
            'emergency_person_name' => 'Mr. Leonhart',
            'emergency_phone' => '09180000109',
            'consent_form' => 'consent_forms/annie-leonhart.pdf',
        ]);

        $member10 = User::create([
            'name' => 'Reiss, Historia',
            'email' => 'historia.reiss@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member10->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00110',
            'last_name' => 'Reiss',
            'first_name' => 'Historia',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member10->email,
            'phone_number' => '09170000110',
            'emergency_person_name' => 'Frieda Reiss',
            'emergency_phone' => '09180000110',
            'consent_form' => 'consent_forms/historia-reiss.pdf',
        ]);

        $member11 = User::create([
            'name' => 'Freckles, Ymir',
            'email' => 'ymir.freckles@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member11->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00111',
            'last_name' => 'Freckles',
            'first_name' => 'Ymir',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 3,
            'email' => $member11->email,
            'phone_number' => '09170000111',
            'emergency_person_name' => 'Historia Reiss',
            'emergency_phone' => '09180000111',
            'consent_form' => 'consent_forms/ymir-freckles.pdf',
        ]);

        $member12 = User::create([
            'name' => 'Bott, Marco',
            'email' => 'marco.bott@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member12->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00112',
            'last_name' => 'Bott',
            'first_name' => 'Marco',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 2,
            'email' => $member12->email,
            'phone_number' => '09170000112',
            'emergency_person_name' => 'Jean Kirstein',
            'emergency_phone' => '09180000112',
            'consent_form' => 'consent_forms/marco-bott.pdf',
        ]);

        $member13 = User::create([
            'name' => 'Forster, Floch',
            'email' => 'floch.forster@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member13->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00113',
            'last_name' => 'Forster',
            'first_name' => 'Floch',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 2,
            'email' => $member13->email,
            'phone_number' => '09170000113',
            'emergency_person_name' => 'Erwin Smith',
            'emergency_phone' => '09180000113',
            'consent_form' => 'consent_forms/floch-forster.pdf',
        ]);

        $member14 = User::create([
            'name' => 'Blouse, Hitch',
            'email' => 'hitch.dreyse@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member14->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00114',
            'last_name' => 'Blouse',
            'first_name' => 'Hitch',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 2,
            'email' => $member14->email,
            'phone_number' => '09170000114',
            'emergency_person_name' => 'Marlo Freudenberg',
            'emergency_phone' => '09180000114',
            'consent_form' => 'consent_forms/hitch-dreyse.pdf',
        ]);

        $member15 = User::create([
            'name' => 'Freudenberg, Marlo',
            'email' => 'marlo.freudenberg@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member15->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00115',
            'last_name' => 'Freudenberg',
            'first_name' => 'Marlo',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 2,
            'email' => $member15->email,
            'phone_number' => '09170000115',
            'emergency_person_name' => 'Hitch Blouse',
            'emergency_phone' => '09180000115',
            'consent_form' => 'consent_forms/marlo-freudenberg.pdf',
        ]);

        $member16 = User::create([
            'name' => 'Ral, Petra',
            'email' => 'petra.ral@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member16->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00116',
            'last_name' => 'Ral',
            'first_name' => 'Petra',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 3,
            'email' => $member16->email,
            'phone_number' => '09170000116',
            'emergency_person_name' => 'Mr. Ral',
            'emergency_phone' => '09180000116',
            'consent_form' => 'consent_forms/petra-ral.pdf',
        ]);

        $member17 = User::create([
            'name' => 'Bozado, Oluo',
            'email' => 'oluo.bozado@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member17->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00117',
            'last_name' => 'Bozado',
            'first_name' => 'Oluo',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 3,
            'email' => $member17->email,
            'phone_number' => '09170000117',
            'emergency_person_name' => 'Petra Ral',
            'emergency_phone' => '09180000117',
            'consent_form' => 'consent_forms/oluo-bozado.pdf',
        ]);

        $member18 = User::create([
            'name' => 'Jinn, Eld',
            'email' => 'eld.jinn@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member18->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00118',
            'last_name' => 'Jinn',
            'first_name' => 'Eld',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 4,
            'email' => $member18->email,
            'phone_number' => '09170000118',
            'emergency_person_name' => 'Gunther Schultz',
            'emergency_phone' => '09180000118',
            'consent_form' => 'consent_forms/eld-jinn.pdf',
        ]);

        $member19 = User::create([
            'name' => 'Schultz, Gunther',
            'email' => 'gunther.schultz@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member19->id,
            'reviewer_id' => $officer2->id,
            'student_id' => '2026-00119',
            'last_name' => 'Schultz',
            'first_name' => 'Gunther',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 4,
            'email' => $member19->email,
            'phone_number' => '09170000119',
            'emergency_person_name' => 'Eld Jinn',
            'emergency_phone' => '09180000119',
            'consent_form' => 'consent_forms/gunther-schultz.pdf',
        ]);

        $member20 = User::create([
            'name' => 'Berner, Moblit',
            'email' => 'moblit.berner@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member20->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00120',
            'last_name' => 'Berner',
            'first_name' => 'Moblit',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 4,
            'email' => $member20->email,
            'phone_number' => '09170000120',
            'emergency_person_name' => 'Hange Zoe',
            'emergency_phone' => '09180000120',
            'consent_form' => 'consent_forms/moblit-berner.pdf',
        ]);

        $member21 = User::create([
            'name' => 'Zacharias, Miche',
            'email' => 'miche.zacharias@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member21->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00121',
            'last_name' => 'Zacharias',
            'first_name' => 'Miche',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 4,
            'email' => $member21->email,
            'phone_number' => '09170000121',
            'emergency_person_name' => 'Nanaba',
            'emergency_phone' => '09180000121',
            'consent_form' => 'consent_forms/miche-zacharias.pdf',
        ]);

        $member22 = User::create([
            'name' => 'Finger, Pieck',
            'email' => 'pieck.finger@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member22->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00122',
            'last_name' => 'Finger',
            'first_name' => 'Pieck',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 3,
            'email' => $member22->email,
            'phone_number' => '09170000122',
            'emergency_person_name' => 'Mr. Finger',
            'emergency_phone' => '09180000122',
            'consent_form' => 'consent_forms/pieck-finger.pdf',
        ]);

        $member23 = User::create([
            'name' => 'Galliard, Porco',
            'email' => 'porco.galliard@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member23->id,
            'reviewer_id' => $officer3->id,
            'student_id' => '2026-00123',
            'last_name' => 'Galliard',
            'first_name' => 'Porco',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 3,
            'email' => $member23->email,
            'phone_number' => '09170000123',
            'emergency_person_name' => 'Marcel Galliard',
            'emergency_phone' => '09180000123',
            'consent_form' => 'consent_forms/porco-galliard.pdf',
        ]);

        $member24 = User::create([
            'name' => 'Grice, Falco',
            'email' => 'falco.grice@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member24->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00124',
            'last_name' => 'Grice',
            'first_name' => 'Falco',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 1,
            'email' => $member24->email,
            'phone_number' => '09170000124',
            'emergency_person_name' => 'Colt Grice',
            'emergency_phone' => '09180000124',
            'consent_form' => 'consent_forms/falco-grice.pdf',
        ]);

        $member25 = User::create([
            'name' => 'Braun, Gabi',
            'email' => 'gabi.braun@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member25->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00125',
            'last_name' => 'Braun',
            'first_name' => 'Gabi',
            'middle_name' => null,
            'course' => 'BSCS',
            'year_level' => 1,
            'email' => $member25->email,
            'phone_number' => '09170000125',
            'emergency_person_name' => 'Reiner Braun',
            'emergency_phone' => '09180000125',
            'consent_form' => 'consent_forms/gabi-braun.pdf',
        ]);

        $member26 = User::create([
            'name' => 'Grice, Colt',
            'email' => 'colt.grice@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member26->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00126',
            'last_name' => 'Grice',
            'first_name' => 'Colt',
            'middle_name' => null,
            'course' => 'BSIT',
            'year_level' => 1,
            'email' => $member26->email,
            'phone_number' => '09170000126',
            'emergency_person_name' => 'Falco Grice',
            'emergency_phone' => '09180000126',
            'consent_form' => 'consent_forms/colt-grice.pdf',
        ]);

        $member27 = User::create([
            'name' => 'Azumabito, Kiyomi',
            'email' => 'kiyomi.azumabito@gmail.com',
            'password' => 'shinzousasageyo',
            'role' => 'member',
        ]);
        MembershipApplication::create([
            'status' => 'approved_member_now',
            'user_id' => $member27->id,
            'reviewer_id' => $officer1->id,
            'student_id' => '2026-00127',
            'last_name' => 'Azumabito',
            'first_name' => 'Kiyomi',
            'middle_name' => null,
            'course' => 'BSIS',
            'year_level' => 1,
            'email' => $member27->email,
            'phone_number' => '09170000127',
            'emergency_person_name' => 'Mikasa Ackerman',
            'emergency_phone' => '09180000127',
            'consent_form' => 'consent_forms/kiyomi-azumabito.pdf',
        ]);

        // ==========================================
        // 4. EVENTS (10 Events before 2026-10-23)
        // ==========================================
        $event1 = Event::create([
            'title' => 'Earthquake Drill',
            'description' => 'Campus-wide earthquake evacuation and emergency response simulation.',
            'date' => '2026-09-10',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'drill',
            'participants' => 'All students',
            'venue_facetoface' => 'School Quadrangle',
        ]);

        $event2 = Event::create([
            'title' => 'DRRT Club Meeting',
            'description' => 'General assembly and orientation of squad roles for the semester.',
            'date' => '2026-09-18',
            'time_hour' => '01',
            'time_minute' => '30',
            'time_ampm' => 'PM',
            'type' => 'meeting',
            'participants' => 'All DRRT Members',
            'venue_online' => 'gmeet',
        ]);

        $event3 = Event::create([
            'title' => 'First Aid Seminar',
            'description' => 'Hands-on training on bandaging, CPR, and basic life support.',
            'date' => '2026-09-25',
            'time_hour' => '09',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'others',
            'participants' => 'All DRRT Members',
            'venue_facetoface' => 'Audio Visual Room',
        ]);

        $event4 = Event::create([
            'title' => 'Fire Safety & Evacuation Drill',
            'description' => 'Fire suppression workshop and building evacuation procedures.',
            'date' => '2026-10-02',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'drill',
            'participants' => 'All students',
            'venue_facetoface' => 'Main Building Grounds',
        ]);

        $event5 = Event::create([
            'title' => 'Intramurals 2027',
            'description' => 'Standby medic duty and first aid station deployment for sports events.',
            'date' => '2026-10-09',
            'time_hour' => '07',
            'time_minute' => '30',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All DRRT Members',
            'venue_facetoface' => 'University Gymnasium',
        ]);

        $event6 = Event::create([
            'title' => 'Foundation Week Day 1',
            'description' => 'Opening ceremony crowd control and first aid booth stationing.',
            'date' => '2026-10-15',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);

        $event7 = Event::create([
            'title' => 'Foundation Week Day 2',
            'description' => 'Day 2 emergency response monitoring and field patrol.',
            'date' => '2026-10-16',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);

        $event8 = Event::create([
            'title' => 'Foundation Week Day 3',
            'description' => 'Day 3 medical standby for outdoor booths and exhibitions.',
            'date' => '2026-10-17',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);

        $event9 = Event::create([
            'title' => 'Foundation Week Day 4',
            'description' => 'Day 4 emergency medic duty for cultural night rehearsals and events.',
            'date' => '2026-10-18',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);

        $event10 = Event::create([
            'title' => 'Foundation Week Day 5',
            'description' => 'Closing ceremony medical standby and post-event debriefing.',
            'date' => '2026-10-19',
            'time_hour' => '08',
            'time_minute' => '00',
            'time_ampm' => 'AM',
            'type' => 'deployment',
            'participants' => 'All students',
            'venue_facetoface' => 'School Grounds',
        ]);

        // ==========================================
        // 5. ATTENDANCES
        // ==========================================
        $allMembers = [
            $officer1, $officer2, $officer3,
            $member1, $member2, $member3, $member4, $member5, $member6,
            $member7, $member8, $member9, $member10, $member11, $member12,
            $member13, $member14, $member15, $member16, $member17, $member18,
            $member19, $member20, $member21, $member22, $member23, $member24,
            $member25, $member26, $member27,
        ];

        // Event 1: Earthquake Drill (2 absent, 1 late)
        $event1AbsentIds = [$member5->id, $member13->id];
        $event1LateIds = [$member4->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event1AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event1->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'absent',
                    'absent_reason' => 'Not feeling well',
                ]);
            } elseif (in_array($person->id, $event1LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event1->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '25',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event1->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '50',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 2: DRRT Club Meeting (0 absent, 2 late)
        $event2AbsentIds = [];
        $event2LateIds = [$member5->id, $member6->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event2AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event2->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'absent',
                    'absent_reason' => 'Lost internet connection',
                ]);
            } elseif (in_array($person->id, $event2LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event2->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'late',
                    'timein_hour' => '01',
                    'timein_minute' => '45',
                    'timein_ampm' => 'PM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event2->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'present',
                    'timein_hour' => '01',
                    'timein_minute' => '25',
                    'timein_ampm' => 'PM',
                ]);
            }
        }

        // Event 3: First Aid Seminar (3 absent, 0 late)
        $event3AbsentIds = [$member9->id, $member14->id, $member22->id];
        $event3LateIds = [];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event3AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event3->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'absent',
                    'absent_reason' => 'Class schedule conflict',
                ]);
            } elseif (in_array($person->id, $event3LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event3->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'late',
                    'timein_hour' => '09',
                    'timein_minute' => '20',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event3->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'present',
                    'timein_hour' => '08',
                    'timein_minute' => '55',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 4: Fire Safety & Evacuation Drill (1 absent, 2 late)
        $event4AbsentIds = [$member11->id];
        $event4LateIds = [$member1->id, $member17->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event4AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event4->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'absent',
                    'absent_reason' => 'Medical appointment',
                ]);
            } elseif (in_array($person->id, $event4LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event4->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '15',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event4->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '45',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 5: Intramurals 2027 (4 absent, 1 late)
        $event5AbsentIds = [$member7->id, $member8->id, $member9->id, $member23->id];
        $event5LateIds = [$member22->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event5AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event5->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'absent',
                    'absent_reason' => 'Competing in varsity tournament',
                ]);
            } elseif (in_array($person->id, $event5LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event5->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'late',
                    'timein_hour' => '07',
                    'timein_minute' => '50',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event5->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '20',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 6: Foundation Week Day 1 (2 absent, 2 late)
        $event6AbsentIds = [$member13->id, $member14->id];
        $event6LateIds = [$member5->id, $member25->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event6AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event6->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'absent',
                    'absent_reason' => 'Family errand',
                ]);
            } elseif (in_array($person->id, $event6LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event6->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '20',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event6->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '50',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 7: Foundation Week Day 2 (5 absent, 1 late)
        $event7AbsentIds = [$member4->id, $member6->id, $member12->id, $member15->id, $member26->id];
        $event7LateIds = [$member17->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event7AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event7->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'absent',
                    'absent_reason' => 'Academic exam preparation',
                ]);
            } elseif (in_array($person->id, $event7LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event7->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '18',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event7->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '52',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 8: Foundation Week Day 3 (1 absent, 0 late)
        $event8AbsentIds = [$member9->id];
        $event8LateIds = [];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event8AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event8->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'absent',
                    'absent_reason' => 'Sick leave',
                ]);
            } elseif (in_array($person->id, $event8LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event8->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '15',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event8->id,
                    'recorder_id' => $officer2->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '48',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 9: Foundation Week Day 4 (3 absent, 2 late)
        $event9AbsentIds = [$member11->id, $member22->id, $member27->id];
        $event9LateIds = [$member1->id, $member24->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event9AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event9->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'absent',
                    'absent_reason' => 'Departmental booth duty',
                ]);
            } elseif (in_array($person->id, $event9LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event9->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '22',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event9->id,
                    'recorder_id' => $officer3->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '55',
                    'timein_ampm' => 'AM',
                ]);
            }
        }

        // Event 10: Foundation Week Day 5 (0 absent, 1 late)
        $event10AbsentIds = [];
        $event10LateIds = [$member5->id];
        foreach ($allMembers as $person) {
            if (in_array($person->id, $event10AbsentIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event10->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'absent',
                    'absent_reason' => 'Personal emergency',
                ]);
            } elseif (in_array($person->id, $event10LateIds)) {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event10->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'late',
                    'timein_hour' => '08',
                    'timein_minute' => '12',
                    'timein_ampm' => 'AM',
                ]);
            } else {
                Attendance::create([
                    'user_id' => $person->id,
                    'event_id' => $event10->id,
                    'recorder_id' => $officer1->id,
                    'status' => 'present',
                    'timein_hour' => '07',
                    'timein_minute' => '50',
                    'timein_ampm' => 'AM',
                ]);
            }
        }
    }
}
