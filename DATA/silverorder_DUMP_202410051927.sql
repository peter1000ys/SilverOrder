USE silverorder;

BEGIN TRANSACTION;

INSERT INTO silverorder.dbo.t_user (user_api_email,user_api_key,user_birth,user_email,user_join_date,user_pw,user_role,user_update_date) VALUES
	 (N'aud2531@naver.com',N'22f1a7e1-4461-453a-8b22-4e377f35761f','2000-10-05',N'silverorder@gmail.com','2024-10-05 18:15:12.101460',N'$2a$10$S8yF.X1fU/nceNO6XHkI7umURoleEk1xSV44qL7VC8ZCayP1zTnVC',N'ROLE_GENERAL','2024-10-05 18:15:12.101505'),
	 (NULL,NULL,'1998-12-03',N'silverorderAdmin@gmail.com','2024-10-05 18:15:21.441219',N'$2a$10$CJI2PB3B.uDuf6hp.SQQw.tvPwxGM7KDmpEdRlIq3q6ZZt0IMnTp.',N'ROLE_ADMIN','2024-10-05 18:15:21.441236');

INSERT INTO silverorder.dbo.t_store (store_id,account_num,address,close_time,latitude,longitude,open_time,store_category,store_desc,store_name,store_rate,store_status,user_id) VALUES
	 (2176,N'0011618747219014',N'광주 광산구 사암로383번길 6',N'2400',35.1788629818155,126.807603511319,N'0000',N'CAFE',N'광주 흑석동 소재 엔제리너스 커피전문점',N'엔제리너스 광주흑석점',4.2,N'OPEN',2);

INSERT INTO silverorder.dbo.t_payment (payment_type,user_id) VALUES
	 (N'PAYMENT_CARD',1),
	 (N'PAYMENT_CARD',1),
	 (N'PAYMENT_CARD',1),
	 (N'PAYMENT_CARD',1);

INSERT INTO silverorder.dbo.t_card (card_cvc,card_issuer_name,card_name,card_num,discount_rate,payment_id) VALUES
	 (N'310',N'KB국민카드',N'SSAFY 스마일카드',N'1001497122655651',10.0,1),
	 (N'484',N'삼성카드',N'삼성카드 taptap 20',N'1002841032046326',NULL,2),
	 (N'500',N'롯데카드',N'디지로카 SEOUL',N'1003146570590882',20.0,3),
	 (N'299',N'롯데카드',N'디지로카London',N'1003839006311502',20.0,4);

INSERT INTO silverorder.dbo.t_store_menu_category (menu_category_name,store_id) VALUES
	 (N'ICE 커피',2176),
	 (N'HOT 커피',2176);

INSERT INTO silverorder.dbo.t_option_category (option_category_title,option_type,store_id) VALUES
	 (N'원두선택',N'OPTION_RADIO',2176),
	 (N'토핑 추가',N'OPTION_RADIO',2176),
	 (N'사이즈 선택',N'OPTION_RADIO',2176);

INSERT INTO silverorder.dbo.t_option (option_name,option_price,option_category_id) VALUES
	 (N'너티',0,1),
	 (N'디카페인',200,1),
	 (N'에스프레소샷 추가',500,2),
	 (N'휘핑크림 추가',500,2),
	 (N'초코시럽 추가',500,2),
	 (N'카라멜시럽 추가',500,2),
	 (N'바닐라시럽 추가',500,2),
	 (N'헤이즐넛시럽 추가',500,2),
	 (N'Small',0,3),
	 (N'Regular',500,3),
	 (N'Large',1000,3);

INSERT INTO silverorder.dbo.t_menu (menu_desc,menu_name,menu_price,menu_status,recommend,simple_name,thumb,menu_category_id) VALUES
	 (N'풍미가 진한 에스프레소에 물을 넣어 연하게 마시는 아이스 커피입니다.',N'아이스 아메리카노',4500,N'MENU_READY',0,N'아이스 아메리카노',N'https://storage.googleapis.com/silver-order-bucket/Angel_ICE_Americano.jpeg',2),
	 (N'풍미가 진한 에스프레소에 물을 넣어 연하게 마시는 따뜻한 커피입니다.',N'따뜻한 아메리카노',4500,N'MENU_READY',0,N'따뜻한 아메리카노',N'https://storage.googleapis.com/silver-order-bucket/Angel_HOT_Americano.jpeg',3),
	 (N'농축유를 블렌딩하여 더욱 진하고 고소한 프리미엄 따뜻한 카페라떼',N'따뜻한 로열카페라떼',5500,N'MENU_READY',0,N'따뜻한 카페라떼',N'https://storage.googleapis.com/silver-order-bucket/Angel_HOT_Latte.jpg',3),
	 (N'농축유를 블렌딩하여 더욱 진하고 고소한 프리미엄 아이스 카페라떼',N'아이스 로열카페라떼',5500,N'MENU_READY',0,N'아이스 카페라떼',N'https://storage.googleapis.com/silver-order-bucket/Angel_ICE_Latte.jpg',2),
	 (N'더욱 진하고 부드러운 로열골드밀크와 담백한 슈크림의 조화롭고 시원한 크림카페라떼(단일 사이즈 / 크기 변경 불가)',N'아이스 로열슈크림라떼',5900,N'MENU_READY',0,N'아이스 슈크림라떼',N'https://storage.googleapis.com/silver-order-bucket/Angel_CreamLatte.png',2),
	 (N'풍미가 진한 에스프레소와 고소한 우유에 달콤한 바닐라 시럽이 어우러진 아이스 커피입니다.',N'아이스 바닐라 카페라떼',5500,N'MENU_READY',0,N'아이스 바닐라 라떼',N'https://storage.googleapis.com/silver-order-bucket/Angel_ICE_VanillaLatte.jpg',2),
	 (N'풍미가 진한 에스프레소와 고소한 스팀 밀크에 달콤한 바닐라 시럽이 어우러진 따뜻한 커피입니다.',N'따뜻한 바닐라 카페라떼',5500,N'MENU_READY',0,N'따뜻한 바닐라 라떼',N'https://storage.googleapis.com/silver-order-bucket/Angel_HOT_VanillaLatte.jpg',3),
	 (N'달콤한 카라멜과 우유 거품의 부드러운 맛이 에스프레소와 어우러진 아이스 커피입니다.',N'아이스 카라멜 마끼아또',5900,N'MENU_READY',0,N'아이스 카라멜 마끼아또',N'https://storage.googleapis.com/silver-order-bucket/Angel_ICE_CaramelMacchiato.jpg',2);

INSERT INTO silverorder.dbo.t_menu_option_category (menu_id,option_category_id) VALUES
	 (1,1),
	 (2,1),
	 (3,1),
	 (4,1),
	 (5,1),
	 (6,1),
	 (7,1),
	 (8,1),
	 (1,2),
	 (2,2),
	 (3,2),
	 (4,2),
	 (6,2),
	 (7,2),
	 (8,2),
	 (1,3),
	 (2,3),
	 (3,3),
	 (4,3),
	 (6,3),
	 (7,3),
	 (8,3);

COMMIT;