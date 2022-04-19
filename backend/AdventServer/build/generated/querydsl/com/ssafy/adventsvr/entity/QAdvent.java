package com.ssafy.adventsvr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAdvent is a Querydsl query type for Advent
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdvent extends EntityPathBase<Advent> {

    private static final long serialVersionUID = 481901893L;

    public static final QAdvent advent = new QAdvent("advent");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    public final ListPath<AdventBox, QAdventBox> adventBoxes = this.<AdventBox, QAdventBox>createList("adventBoxes", AdventBox.class, QAdventBox.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createAt = _super.createAt;

    public final NumberPath<Integer> day = createNumber("day", Integer.class);

    public final DatePath<java.time.LocalDate> endAt = createDate("endAt", java.time.LocalDate.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath isReceived = createBoolean("isReceived");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath password = createString("password");

    public final StringPath passwordHint = createString("passwordHint");

    public final StringPath randomUrl = createString("randomUrl");

    public final DateTimePath<java.time.LocalDateTime> receivedAt = createDateTime("receivedAt", java.time.LocalDateTime.class);

    public final StringPath recipientName = createString("recipientName");

    public final NumberPath<Integer> userId = createNumber("userId", Integer.class);

    public QAdvent(String variable) {
        super(Advent.class, forVariable(variable));
    }

    public QAdvent(Path<? extends Advent> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAdvent(PathMetadata metadata) {
        super(Advent.class, metadata);
    }

}

